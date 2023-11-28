const Room = require("../../models/room");
const Hotel = require("../../models/hotel");
const Transaction = require("../../models/transaction");
const { default: mongoose } = require("mongoose");

exports.getRooms = async (req, res, next) => {
  try {
    const { page } = req.query;

    let rooms;
    if (page)
      rooms = await Room.paginate(
        {},
        {
          page,
          limit: 9,
        },
        (err, result) => res.status(200).json(result)
      );
    else {
      rooms = await Room.find();
      return res.status(200).json(rooms);
    }
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong." });
  }
};

exports.getRoomById = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.roomId);

    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong." });
  }
};

exports.createRoom = async (req, res, next) => {
  try {
    const { title, hotel, desc, price, maxPeople, roomNumbers } = req.body;

    const room = new Room({ title, price, desc, roomNumbers, maxPeople });

    const savedRoom = await room.save();

    const hotelToAddRoom = await Hotel.findOne({ name: hotel });

    hotelToAddRoom.rooms.push(savedRoom._id);

    await hotelToAddRoom.save();

    res.status(200).json({ msg: "Create room successfully." });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ msg: "Something went wrong or you didn't fill out all fields." });
  }
};

exports.deleteRoom = async (req, res, next) => {
  try {
    const { roomId } = req.body;

    const room = await Room.findById(roomId);

    if (!room)
      return res.status(400).json({ msg: "This room is already deleted." });

    for (const rn of room.roomNumbers) {
      const roomTransaction = await Transaction.findOne({ room: rn });

      if (roomTransaction)
        return res
          .status(400)
          .json({ msg: "This room is in a transaction, cannot delete." });
    }

    await Hotel.updateMany(
      { rooms: roomId },
      {
        $pull: {
          rooms: roomId,
        },
      }
    );

    await Room.findByIdAndDelete(roomId);

    res.status(200).json({ msg: "Delete room successfully." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Something went wrong." });
  }
};

exports.editRoom = async (req, res, next) => {
  try {
    const { roomId, title, price, roomNumbers, desc, maxPeople, hotel } =
      req.body;

    await Room.findByIdAndUpdate(roomId, {
      title,
      price,
      roomNumbers,
      desc,
      maxPeople,
    });

    const hotelToAddRoom = await Hotel.findOne({ name: hotel });

    if (!hotelToAddRoom.rooms.some((r) => r.toString() === roomId)) {
      hotelToAddRoom.rooms.push(roomId);
      await hotelToAddRoom.save();
    }

    res.status(200).json({ msg: "Edit room successfully." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Something went wrong." });
  }
};
