// server.js
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const path = require('path');
const bodyParser = require('body-parser');
require("dotenv").config();
const port = 3000;
const ProductModel = require("./models/product");


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



//Connect to the mongoDb database
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
