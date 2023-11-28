const Transaction = require("../../models/transaction");

exports.getAllTransactions = async (req, res, next) => {
  try {
    const { page } = req.query;

    let transactions;
    if (page)
      transactions = await Transaction.paginate(
        {},
        {
          page,
          limit: 9,
        },
        (err, result) => res.status(200).json(result)
      );
    else {
      transactions = await Transaction.find();
      return res.status(200).json(transactions);
    }
  } catch (err) {
    res.status(400).json({ msg: "An error happened." });
  }
};
