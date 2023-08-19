import React from "react";
import "./App.css";
import Home from "./Pages/Home/Home.jsx";
import NavigationBar from "./Shared Components/Navbar";
import Inventory from "./Pages/Inventory/Inventory";
import Cart from "./Pages/Cart/Cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartContextProvider } from "./context/cartContext";
import Checkout from "./Pages/Checkout/Checkout";
import Footer from "./Shared Components/Footer";
import Confirmation from "./Pages/Confirmation/Confirmation";
import Register from "./Pages/Register/Register";
import SignIn from "./Pages/SignIn/SignIn";
import { AuthProvider } from "../src/context/AuthContext";
import GetUser from "./Pages/GetUser/GetUser";

function App() {
  console.log(import.meta.env.VITE_API);
  return (
    <AuthProvider>
      <CartContextProvider>
        <Router>
          <NavigationBar />
          <div className="app-content">
            <div className="main-content">
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/:category" element={<Inventory />} />
                <Route exact path="/cart" element={<Cart />} />
                <Route exact path="/signin" element={<SignIn />} />
                <Route exact path="/checkout" element={<Checkout />} />
                <Route exact path="/confirmation" element={<Confirmation />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/getuser" element={<GetUser />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </Router>
      </CartContextProvider>
    </AuthProvider>
  );
}

export default App;
