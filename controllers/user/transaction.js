const Transaction = require("../../models/transaction");

exports.getTransactionsOfUser = async (req, res, next) => {
  try {
    const { user } = req.params;

    const transactions = await Transaction.find({ user });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong." });
  }
};

exports.createTransaction = async (req, res, next) => {
  try {
    const transaction = new Transaction(req.body);

    await transaction.save();

    res.status(200).json({ msg: "Create transaction successfully." });
  } catch (error) {
    res
      .status(400)
      .json({ msg: "Something went wrong or you didn't fill out all fields." });
  }
};
