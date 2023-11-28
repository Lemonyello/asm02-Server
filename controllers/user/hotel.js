const Hotel = require("../../models/hotel");
const Room = require("../../models/room");
const Transaction = require("../../models/transaction");

exports.getHotelByAddress = async (req, res, next) => {
  try {
    const { hotelAddress } = req.params;

    const hotels = await Hotel.find({
      address: { $regex: hotelAddress, $options: "i" },
    });

    res.status(200).json(hotels);
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong." });
  }
};

exports.getHotelByType = async (req, res, next) => {
  try {
    const { hotelType } = req.params;

    const hotels = await Hotel.find({
      type: hotelType,
    });

    res.status(200).json(hotels);
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong." });
  }
};

exports.getHotelTopRating = async (req, res, next) => {
  try {
    let hotels = await Hotel.find().sort({ rating: "desc" }).limit(3);
    res.status(200).json(hotels);
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong." });
  }
};

exports.searchHotel = async (req, res, next) => {
  try {
    let { city, dateStart, dateEnd, numRoom, numPeople } = req.query;

    const filteredHotels = [];

    const hotels = await Hotel.getHotelsInCity(city);

    if (!dateStart && !dateEnd && !numRoom && !numPeople)
      return res.status(200).json(hotels);

    for (const h of hotels) {
      let transactions = await Transaction.find({ hotel: h.name });

      if (dateEnd && dateStart) {
        transactions = Transaction.getBookedTransactionInDate(
          transactions,
          dateStart,
          dateEnd
        );
      }

      const bookedRoomNumberList =
        Transaction.getBookedRoomNumberList(transactions);

      const roomNumberList = Room.getRoomNumberList(h.rooms);

      const notBookedRoomNumberList = roomNumberList.filter(
        (rn) => !bookedRoomNumberList.includes(rn)
      );

      if (numRoom) {
        if (notBookedRoomNumberList.length < numRoom) continue;
      }

      if (numPeople) {
        const totalPeopleCanStay = Room.getTotalPeopleCanStay(
          notBookedRoomNumberList,
          h.rooms
        );

        if (totalPeopleCanStay < numPeople) continue;
      }

      filteredHotels.push(h);
    }

    res.status(200).json(filteredHotels);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Something went wrong." });
  }
};

exports.getNotBookedRoomOfHotel = async (req, res, next) => {
  try {
    const { hotelId, dateStart, dateEnd } = req.query;
    const hotel = await Hotel.findById(hotelId).populate("rooms").exec();

    let transactions = await Transaction.find({ hotel: hotel.name });

    transactions = Transaction.getBookedTransactionInDate(
      transactions,
      dateStart,
      dateEnd
    );

    const bookedRoomNumberList =
      Transaction.getBookedRoomNumberList(transactions);

    const notBookedRooms = hotel.rooms
      .map((r) => {
        r.roomNumbers = r.roomNumbers.filter(
          (rn) => !bookedRoomNumberList.includes(rn)
        );

        return r;
      })
      .filter((r) => r.roomNumbers.length);

    res.status(200).json(notBookedRooms);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Something went wrong." });
  }
};
