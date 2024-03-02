const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://kishalaymodak:kishalay@cluster0.bsi83b2.mongodb.net/paytm"
);

const UserSchema = new mongoose.Schema({
  userName: String,
  firstName: String,
  lastName: String,
  password: String,
});

const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  balance: {
    type: Number,
  },
});

const User = mongoose.model("User", UserSchema);
const Account = mongoose.model("Account", AccountSchema);
module.exports = {
  User,
  Account,
};
