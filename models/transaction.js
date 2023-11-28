const { Schema, default: mongoose } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const transactionSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  hotel: {
    type: String,
    required: true,
  },
  room: [
    {
      type: Number,
      required: true,
    },
  ],
  dateStart: {
    type: String,
    required: true,
  },
  dateEnd: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  payment: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

transactionSchema.plugin(mongoosePaginate);

transactionSchema.methods.isBookedInDate = function (dateStart, dateEnd) {
  const transacDateEnd = new Date(this.dateEnd).getTime();
  const transacDateStart = new Date(this.dateStart).getTime();

  return (
    (dateStart >= transacDateStart && dateStart <= transacDateEnd) ||
    (dateEnd >= transacDateStart && dateEnd <= transacDateEnd)
  );
};

transactionSchema.statics.getBookedTransactionInDate = function (
  transactions,
  dateStart,
  dateEnd
) {
  dateStart = new Date(dateStart).getTime();
  dateEnd = new Date(dateEnd).getTime();

  return transactions.filter((transac) =>
    transac.isBookedInDate(dateStart, dateEnd)
  );
};

transactionSchema.statics.getBookedRoomNumberList = function (transactions) {
  return transactions.reduce((bookedRooms, transac) => {
    bookedRooms.push(...transac.room);
    return bookedRooms;
  }, []);
};

module.exports = mongoose.model("Transaction", transactionSchema);
