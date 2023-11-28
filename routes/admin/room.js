const express = require("express");

const ctrlRoom = require("../../controllers/admin/room");

const router = express.Router();

router.get("/rooms", ctrlRoom.getRooms);

router.get("/:roomId", ctrlRoom.getRoomById);

router.post("/create-room", ctrlRoom.createRoom);

router.delete("/delete-room", ctrlRoom.deleteRoom);

router.patch("/edit-room", ctrlRoom.editRoom);

module.exports = router;
