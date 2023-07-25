const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    image: String,
    title: String,
    price: Number,
    quantity: Number,
    totalPrice: Number
})

module.exports = mongoose.model("CartModel", cartSchema);