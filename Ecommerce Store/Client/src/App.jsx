import React from 'react';
import './App.css';
import Home from './Pages/Home/Home.jsx';
import NavigationBar from './Shared Components/Navbar';
import Ski from './Pages/Ski/Ski';
import Cart from './Pages/Cart/Cart';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import { CartContextProvider } from './context/cartContext'; // Import the CartContextProvider
import Checkout from './Pages/Checkout/Checkout';
import Footer from './Shared Components/Footer';

function App() {
  return (
    <CartContextProvider>
      <Router>
        <NavigationBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/:category" element={<Ski />} />
          {/* <Route exact path="/snowboard" element={<Snowboard />} /> */}
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </Router>
    </CartContextProvider>
  );
}

export default App;
