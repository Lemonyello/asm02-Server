const express = require("express");

const ctrlTransaction = require("../../controllers/user/transaction");

const router = express.Router();

router.get("/:user", ctrlTransaction.getTransactionsOfUser);

router.post("/create", ctrlTransaction.createTransaction);

module.exports = router;
