const Hotel = require("../../models/hotel");
const Transaction = require("../../models/transaction");

exports.getHotels = async (req, res, next) => {
  try {
    const { page } = req.query;

    let hotels;
    if (page)
      hotels = await Hotel.paginate(
        {},
        {
          page,
          limit: 9,
        },
        (err, result) => res.status(200).json(result)
      );
    else {
      hotels = await Hotel.find();
      return res.status(200).json(hotels);
    }
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong." });
  }
};

exports.getHotelById = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.hotelId)
      .populate("rooms")
      .exec();

    res.status(200).json(hotel);
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong." });
  }
};

exports.createHotel = async (req, res, next) => {
  try {
    const hotel = new Hotel(req.body);

    await hotel.save();

    res.status(200).json({ msg: "Create hotel successfully." });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ msg: "Something went wrong or you didn't fill out all fields." });
  }
};

exports.deleteHotel = async (req, res, next) => {
  try {
    const { name, hotelId } = req.body;

    const h = await Hotel.findById(hotelId);

    if (!h)
      return res.status(400).json({ msg: "This hotel is already deleted." });

    const hotel = await Transaction.findOne({ hotel: name });

    if (hotel)
      return res
        .status(400)
        .json({ msg: "This hotel is in a transaction, cannot delete." });

    await Hotel.findByIdAndRemove(hotelId);

    res.status(200).json({ msg: "Delete hotel succesfully." });
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong." });
  }
};

exports.editHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndUpdate(req.body.hotelId, req.body);

    res.status(200).json({ msg: "Edit hotel successfully." });
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong." });
  }
};
