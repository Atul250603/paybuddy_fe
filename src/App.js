import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { Routes, Route,BrowserRouter } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import { useEffect, useState } from 'react';
import BillSplitter from './components/BillSplitter';
import About from './components/About';
function App() {  
  
  //one more condition if the transaction is already present then just add the amount so create one api and use it and after that update the array value
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/about" element={<About/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/signup" element={<Signup/>} />
        <Route exact path="/billsplit" element={<BillSplitter/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
