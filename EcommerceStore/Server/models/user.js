const mongoose = require('mongoose');
const CartModel = require("./cart")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [CartModel.schema],
});

const User = mongoose.model('UserModel', userSchema);

module.exports = User;