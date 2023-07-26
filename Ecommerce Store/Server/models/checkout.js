const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema({
    image: String,
    title: String,
    price: Number,
    quantity: Number
})

module.exports = mongoose.model("CheckoutModel", checkoutSchema);