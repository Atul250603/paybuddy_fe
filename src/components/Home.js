import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import NewTransactForm from './NewTransactForm'
import toast from 'react-hot-toast'
export default function Home(props) {
  const navigate=useNavigate();
  const path=useLocation().pathname;
  const [amount,setamount]=useState(null);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/home");
    }
    else{
      const fetchamount=async()=>{
        const response = await fetch(`${process.env.REACT_APP_SERVER}/transact/fetchamount`, {
          method: 'GET',
          headers: {
            'authToken': localStorage.getItem('token')
          }
        });
        let resp=await response.json();
        if(resp && !resp.errors){
          setamount(resp);
        }
        else if(resp &&resp.errors){
          toast.error(resp.errors);
        }
        else{
          toast.error("Some Error Occured");
        }
      }

      fetchamount();
    }

  }, []);
  return (
    <div className="container mt-4">
    <div className='d-flex justify-content-center my-2'>
    <NewTransactForm transaction={props.transaction} settransaction={props.settransaction}/>
    </div>
    <div className='d-flex justify-content-center my-4'>
      <div className='d-flex gap-4 border border-primary border-4 p-4 rounded'>
        <div>
          <div>Amount To Take</div>
          <div className='fw-bold fs-1'>Rs. {amount?amount.takeamount:0}</div>
        </div>
        <div className='border border-primary border-2'>

        </div>
        <div>
          <div>Amount To Pay</div>
          <div className='fw-bold fs-1'>Rs. {amount?amount.payamount:0}</div>
        </div>
      </div>
    </div>
    <div className='mt-4 d-flex justify-content-center'>
      <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class={`btn ${(path && path.trim()==='/')?"btn-primary":"btn-light"}`} onClick={()=>navigate('/')}>Amount To Take</button>
          <button type="button" class={`btn ${(path && path.trim()==='/amounttopay')?"btn-primary":"btn-light"}`} onClick={()=>navigate('/amounttopay')}>Amount To Pay</button>
      </div>
    </div>
    
    <Outlet/>
</div>
  )
}
