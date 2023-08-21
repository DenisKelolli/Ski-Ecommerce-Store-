const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const path = require('path');
const bodyParser = require('body-parser');
require("dotenv").config();
const port = 3000;
const ProductModel = require("./models/product");
const CartModel = require("./models/cart");
const UserModel = require("./models/user");
const MongoStore = require('connect-mongo');

// Session middleware configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_CONNECTION_STRING })
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


//Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.get('/getuser', (req, res) => {

  if (req.isAuthenticated() && req.user) {
    const username = req.user.username; 
    res.json({ username });
  } else {
    console.log('User is not authenticated.'); 
    res.status(401).json({ error: 'User is not authenticated' });
  }
});

app.use(express.static(path.join(__dirname, '../Client/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser(process.env.SESSION_SECRET));

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
}

// Passport strategy configuration
passport.use(new passportLocal(async (username, password, done) => {
  console.log('Trying to authenticate:', username); 

  try {
    const user = await UserModel.findOne({ username: username });

    if (!user) {
      console.log('User not found:', username); 
      return done(null, false);
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) throw err;

      console.log('Password comparison result:', result); 

      if (result) return done(null, user);
      else return done(null, false);
    });
  } catch (err) {
    return done(err);
  }
}));

// Serialization and deserialization for the user
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});
passport.deserializeUser(async (id, done) => {

  try {
    const user = await UserModel.findOne({ _id: id });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});


app.get("/cart", isAuthenticated, async (req, res) => {
  try {
    // Find the user in the UserModel and populate the cart items
    const user = await UserModel.findById(req.user._id).populate('cart');
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ error: "Error fetching cart items" });
  }
});

app.post("/cart", isAuthenticated, async (req, res) => {
  const { title, image, price, quantity } = req.body;
  const userId = req.user._id; // Get the MongoDB ObjectID for the authenticated user

  try {
    // Find the user in the UserModel
    const user = await UserModel.findById(userId).populate('cart');

    let cartItem = user.cart.find(item => item.title === title);

    if (cartItem) {
      // If the item exists, update its quantity
      cartItem.quantity += quantity || 1;
    } else {
      // If the item does not exist, create a new cart item and push it to the user's cart
      cartItem = {
        title,
        image,
        price,
        quantity: quantity || 1,
      };
      user.cart.push(cartItem);
    }

    // Save the updated user document
    await user.save();

    res.status(201).json({ message: "Product added to cart successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error adding product to cart" });
  }
});

app.put("/cart/:id", isAuthenticated, async (req, res) => {
  const productId = req.params.id;
  const { quantity } = req.body;

  try {
    // Find the user in the UserModel
    const user = await UserModel.findById(req.user._id);

    let cartItem = user.cart.id(productId); // Find the cart item by its _id

    if (cartItem) {
      // If the item exists, update its quantity
      cartItem.quantity = quantity;
      await user.save();
      res.json({ message: "Item quantity updated successfully", quantity: cartItem.quantity });
    } else {
      res.status(404).json({ error: "Cart item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating item quantity" });
  }
});

app.delete("/cart/:id", isAuthenticated, async (req, res) => {
  const productId = req.params.id;

  try {
    // Find the user in the UserModel
    const user = await UserModel.findById(req.user._id);

    const productIndex = user.cart.findIndex(item => item._id.toString() === productId);

    if (productIndex !== -1) {
      user.cart.splice(productIndex, 1);
      await user.save();
      res.json({ message: "Product deleted from cart successfully" });
    } else {
      res.status(404).json({ error: "Cart item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting product from cart" });
    console.error('Error deleting product:', error); // Log the error for debugging
  }
});


app.get("/checkout", isAuthenticated, async (req, res) => {
  try {
    // Find the user in the UserModel
    const user = await UserModel.findById(req.user._id);
    res.json(user.cart); // Send the user's cart as response
  } catch (error) {
    res.status(500).json({ error: "Error fetching cart items" });
  }
});

// Handle DELETE request to clear the cart (checkout)
app.delete("/checkout", isAuthenticated, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id);
    user.cart = [];
    await user.save();
    res.json({ message: "Cart items cleared successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error clearing cart items" });
  }
});

//Dynamically route based on category defined in MongoDb productmodels collection. 
app.get("/:category", (req, res) => {
  const category = req.params.category;
  ProductModel.find({ category })
    .then((products) => res.json(products))
    .catch((error) => res.status(500).json({ error: `Error fetching ${category} data` }));
});

app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username is already taken
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already taken' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document with the provided username and hashed password
    const newUser = new UserModel({ username, password: hashedPassword });

    // Save the user document to the database
    await newUser.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong, please try again later.' });
  }
});

// User Login Endpoint
app.post("/signin", (req, res, next) => {
  console.log('Login request received:', req.body); // Debugging log
  passport.authenticate("local")(req, res, next);
}, (req, res) => {
  res.status(200).json({ message: "Login successful" });
});

// Logout endpoint
app.post("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        res.status(500).json({ message: "Logout failed" });
      } else {
        res.clearCookie("connect.sid"); // Clear the connect.sid cookie
        res.status(200).end(); // Responding with status 200 without JSON message
      }
    });
  });
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
