const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    image: String,
    title: String,
    price: Number,
    category: String,
    categories: String
})

module.exports = mongoose.model("ProductModel", productSchema);