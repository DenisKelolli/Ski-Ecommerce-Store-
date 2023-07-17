import React from 'react'
import './App.css'
import Home from "./Pages/Home/Home.jsx"
import NavigationBar from './Shared Components/Navbar'
import Ski from './Pages/Ski/Ski'
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';

function App() {
  

  return (
    <>
    <Router>
      <NavigationBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/ski" element={<Ski />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
