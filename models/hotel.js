const { Schema, default: mongoose } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const hotelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  photos: [
    {
      type: String,
      required: true,
    },
  ],
  desc: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    required: true,
  },
  cheapestPrice: {
    type: Number,
    required: true,
  },
  rooms: [
    {
      type: Schema.Types.ObjectId,
      ref: "Room",
    },
  ],
});

hotelSchema.plugin(mongoosePaginate);

hotelSchema.statics.getHotelsInCity = async function (city) {
  let hotels;
  if (city) hotels = await this.find({ city }).populate("rooms").exec();
  else hotels = await this.find().populate("rooms").exec();

  return hotels;
};

module.exports = mongoose.model("Hotel", hotelSchema);
