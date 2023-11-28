const express = require("express");

const ctrlHotel = require("../../controllers/admin/hotel");

const router = express.Router();

router.get("/hotels", ctrlHotel.getHotels);

router.get("/:hotelId", ctrlHotel.getHotelById);

router.post("/create-hotel", ctrlHotel.createHotel);

router.delete("/delete-hotel", ctrlHotel.deleteHotel);

router.patch("/edit-hotel", ctrlHotel.editHotel);

module.exports = router;
