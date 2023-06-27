import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import payContext from '../context/paycontext/PayContext'
import AmountToPay from './AmountToPay'
import AmountToTake from './AmountToTake'
import NewTransactForm from './NewTransactForm'
export default function Home(props) {
  const navigate=useNavigate();
  const [transaction, settransaction] = useState([])
  const [topay, settopay] = useState([0]);
  const [status, setstatus] = useState("false")
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    if(localStorage.getItem('token')){
    const helper=async()=>{
    const amounttotake=async()=>{
      const response = await fetch("https://paybuddy.onrender.com/transact/totake", {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'authToken': localStorage.getItem('token')
            // 'Content-Type': 'application/x-www-form-urlencoded',
          }
        });
        let resp=await response.json();
        settransaction(resp.transact);
      }
      const fetchalltransactions=async()=>{
        const response = await fetch("https://paybuddy.onrender.com/transact/fetchalltransact", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'authToken': localStorage.getItem('token')
              // 'Content-Type': 'application/x-www-form-urlencoded',
            }
          });
          let resp=await response.json();
          settopay(resp);
        }
        await amounttotake();
        await fetchalltransactions();
        setstatus("true");
    }
    helper();
  }
  }, []);
  return (
    (status==="false")?<div className='text-center mt-3'><div className="spinner-border text-primary" role="status">
    <span className="visually-hidden">Loading...</span>
  </div></div>:<div className="container mt-4">
    <div className='d-flex my-2'>
    <h3>Add New Transaction</h3>
    <NewTransactForm topay={topay} settopay={settopay}/>
    </div>
    <div className="my-2">
    <h3>Amount To Pay</h3>
    <div className="row">
    {(topay&&topay.length>0 && topay.length!==undefined)?topay.map((temp,index)=>{
      return <AmountToPay User={temp.nextUser} Name={temp.nextUserName} Amount={temp.amount} Date={temp.date} key={temp._id} index={index} topay={topay} settopay={settopay}/>
    }):<></> }
    </div>
    </div>
    <div className="my-2">
    <h3>Amount To Take</h3>
    <div className="row">
    {(transaction && transaction.length>0)?transaction.map((temp,index)=>{
      return <AmountToTake User={temp.user} Amount={temp.amount} Date={temp.date} key={temp._id}/>
    }):<></> }
    </div>
    </div>
</div>
  )
}
