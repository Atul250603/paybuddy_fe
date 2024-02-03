import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import payContext from '../context/paycontext/PayContext'
import AmountToPay from './AmountToPay'
import AmountToTake from './AmountToTake'
import NewTransactForm from './NewTransactForm'
import toast from 'react-hot-toast'
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
      const response = await fetch(`${process.env.REACT_APP_SERVER}/transact/totake`, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'authToken': localStorage.getItem('token')
            // 'Content-Type': 'application/x-www-form-urlencoded',
          }
        });
        let resp=await response.json();
        if(resp && !resp.errors){
          settransaction(resp.transact);
        }
        else if(resp &&resp.errors){
          toast.error(resp.errors);
        }
        else{
          toast.error("Some Error Occured");
        }
      }
      const fetchalltransactions=async()=>{
        const response = await fetch(`${process.env.REACT_APP_SERVER}/transact/fetchalltransact`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'authToken': localStorage.getItem('token')
              // 'Content-Type': 'application/x-www-form-urlencoded',
            }
          });
          let resp=await response.json();
          if(resp && !resp.errors){
            settopay(resp);
          }
          else if(resp &&resp.errors){
            toast.error(resp.errors);
          }
          else{
            toast.error("Some Error Occured");
          }
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
    <div className='d-flex justify-content-center my-2'>
    <NewTransactForm topay={topay} settopay={settopay}/>
    </div>
    <div className="my-2">
    <h3>Amount To Pay</h3>
    <div className="row">
    {(topay&&topay.length>0 && topay.length!==undefined)?topay.map((temp,index)=>{
      return <AmountToPay User={temp.nextUser} Name={temp.nextUserName} Amount={temp.amount} Date={temp.date} key={temp._id} index={index} topay={topay} settopay={settopay}/>
    }):<div>No Records Yet....</div> }
    </div>
    </div>
    <div className="my-2">
    <h3>Amount To Take</h3>
    <div className="row">
    {(transaction && transaction.length>0)?transaction.map((temp,index)=>{
      return <AmountToTake User={temp.user} Amount={temp.amount} Date={temp.date} key={temp._id}/>
    }):<div>No Records Yet....</div> }
    </div>
    </div>
</div>
  )
}
