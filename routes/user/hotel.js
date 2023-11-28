const express = require("express");

const ctrlHotel = require("../../controllers/user/hotel");

const router = express.Router();

router.get("/address/:hotelAddress", ctrlHotel.getHotelByAddress);

router.get("/type/:hotelType", ctrlHotel.getHotelByType);

router.get("/top-rate", ctrlHotel.getHotelTopRating);

router.get("/search", ctrlHotel.searchHotel);

router.get("/not-booked-rooms", ctrlHotel.getNotBookedRoomOfHotel);

module.exports = router;
