const express = require("express");
const router = express.Router();
const authMiddlewere = require("./middleweres");
const { Account } = require("../db/db");
const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");

router.get("/balance", authMiddlewere, async (req, res) => {
  const user = jwt.decode(jwtToken);
  const userId = user.userId;
  console.log(req.body.userId);
  const account = await Account.findOne({
    userId,
  });

  res.json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddlewere, async (req, res) => {
  console.log("jwt in ts" + jwtToken);
  const userId = jwt.decode(jwtToken);

  console.log("userId:" + userId.userId);
  const seasson = await mongoose.startSession();

  seasson.startTransaction();
  const { amount, to } = req.body;
  console.log(amount);
  const account = await Account.findOne({ userId: userId.userId }).session(
    seasson
  );
  console.log(account.balance);
  if (!account || account.balance < amount) {
    await seasson.abortTransaction();

    return res.status(400).json({
      message: "insuficent Balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(seasson);

  if (!toAccount) {
    await seasson.abortTransaction();

    return res.status(400).json({
      message: "invalid User",
    });
  }

  await Account.updateOne(
    { userId: userId.userId },
    { $inc: { balance: -amount } }
  ).session(seasson);

  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(seasson);

  await seasson.commitTransaction();

  res.json({
    message: "transaction successfull",
  });
});
module.exports = router;
