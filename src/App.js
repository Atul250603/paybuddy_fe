import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { Routes, Route,BrowserRouter } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import BillSplitter from './components/BillSplitter';
import {Toaster} from 'react-hot-toast'
import Landing from './components/Landing';
import AmountToPayHandler from './components/AmountToPayHandler';
import AmountToTakeHandler from './components/AmountToTakeHandler';
import { useState } from 'react';
function App() {  
  const [transaction, settransaction] = useState([])
  return (
    <div>
      <div><Toaster position="top-right" toastOptions={{style:{borderRadius: '10px',
      background: '#333',
      color: '#fff',}}}/></div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
        <Route exact path="/" element={<Home transaction={transaction} settransaction={settransaction}/>}>
          <Route index element={<AmountToTakeHandler transaction={transaction} settransaction={settransaction}/>}/>
          <Route path="amounttopay" element={<AmountToPayHandler/>}/>
        </Route>
        <Route exact path="/home" element={<Landing/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/signup" element={<Signup/>} />
        <Route exact path="/billsplit" element={<BillSplitter/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
