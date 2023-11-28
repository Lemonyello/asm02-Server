const express = require("express");

const ctrlTransaction = require("../../controllers/admin/transaction");

const router = express.Router();

router.get("/transactions", ctrlTransaction.getAllTransactions);

module.exports = router;
