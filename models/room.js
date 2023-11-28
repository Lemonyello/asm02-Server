const { Schema, default: mongoose } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const roomSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  maxPeople: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  roomNumbers: [
    {
      type: Number,
      required: true,
    },
  ],
});

roomSchema.plugin(mongoosePaginate);

roomSchema.statics.getRoomNumberList = function (rooms) {
  return rooms.reduce((roomNumbers, r) => {
    roomNumbers.push(...r.roomNumbers);
    return roomNumbers;
  }, []);
};

roomSchema.statics.getTotalPeopleCanStay = function (roomNumberList, rooms) {
  return roomNumberList.reduce(
    (sumPeople, rn) =>
      sumPeople + rooms.find((r) => r.roomNumbers.includes(rn)).maxPeople,
    0
  );
};
module.exports = mongoose.model("Room", roomSchema);
