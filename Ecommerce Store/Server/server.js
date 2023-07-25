const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const path = require('path');
const bodyParser = require('body-parser');
require("dotenv").config();
const port = 3000;
const ProductModel = require("./models/product");
const CartModel = require("./models/cart");

app.use(cors());
app.use(express.static(path.join(__dirname, '../Client/public')));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("This is the Homepage!");
});

app.get("/ski", (req, res) => {
  ProductModel.find({ category: "ski" })
    .then((skis) => res.json(skis))
    .catch((error) => res.status(500).json({ error: "Error fetching ski data" }));
});

app.get("/cart", (req, res) => {
  CartModel.find()
    .then((cartItems) => res.json(cartItems))
    .catch((error) => res.status(500).json({ error: "Error fetching cart items" }));
});

app.post("/cart", async (req, res) => {
  const { title, image, price, quantity } = req.body;

  try {
    let cartItem = await CartModel.findOne({ title }); // Check if the item already exists in the cart based on title

    if (cartItem) {
      // If the item exists, update its quantity
      cartItem.quantity += quantity || 1;
    } else {
      // If the item does not exist, create a new cart item
      cartItem = new CartModel({
        title,
        image,
        price,
        quantity: quantity || 1,
      });
    }

    await cartItem.save(); 

    res.status(201).json({ message: "Product added to cart successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error adding product to cart" });
  }
});

app.put("/cart/:title", async (req, res) => {
  const productTitle = req.params.title;
  const { quantity } = req.body;

  try {
    let cartItem = await CartModel.findOne({ title: productTitle }); // Find the cart item by its title

    if (cartItem) {
      // If the item exists, update its quantity
      cartItem.quantity = quantity;
      await cartItem.save(); 
      res.json({ message: "Item quantity updated successfully", quantity: cartItem.quantity });
    } else {
      res.status(404).json({ error: "Cart item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating item quantity" });
  }
});

app.delete("/cart", (req, res) => {
  const productId = req.params.id;
  CartModel.findOneAndDelete({ id: productId })
    .then(() => res.json({ message: "Product deleted from cart successfully" }))
    .catch((error) => res.status(500).json({ error: "Error deleting product from cart" }));
});

app.get("/snowboard", (req, res) => {
  ProductModel.find({ category: "snowboard" })
    .then((skis) => res.json(skis))
    .catch((error) => res.status(500).json({ error: "Error fetching ski data" }));
});

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (e) {
    console.log(e.message);
  }
};

start();
