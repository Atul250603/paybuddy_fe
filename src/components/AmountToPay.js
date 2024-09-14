import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
export default function AmountToPay(props) {
  const [amount, setamount] = useState(0);
  const [error, seterror] = useState("");
  const [showSpinner,setshowSpinner]=useState(false);
  const{topay,settopay}=props;
  const refClose = useRef(null)
  const colors=["#FF0000","#0000FF","#FF69B4"]
  const settingamount=(e)=>{
    setamount(e.target.value);
  }
 
  const paid=async(e)=>{
    e.preventDefault();
    if(amount<=0 || amount>props.Amount){
      seterror("Invalid Amount");
    }
    else{
      setshowSpinner(true);
      const response = await fetch(`${process.env.REACT_APP_SERVER}/transact/paid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authToken':localStorage.getItem('token')
        },
        body: JSON.stringify({email:props.User.email,amount:amount})
      });
      let resp=await response.json(); 
      if(resp && resp.success){
        toast.success(resp.success)
        const tempAmount=props.Amount-amount;
        if(tempAmount==0){
          const temptopay=[...topay];
          const idx=temptopay.findIndex((element)=>{return element.nextUser._id===props.User._id});
          let removed= temptopay.splice(idx,1);
          settopay(temptopay);
        }
        else{
          const temptopay=[...topay];
          const idx=temptopay.findIndex((element)=>{return element.nextUser._id===props.User._id});
          temptopay[idx].amount-=amount;
          settopay(temptopay);
        }
      }
      setshowSpinner(false);
      refClose.current.click();
    }
  }
  return (
    (props.User)?
         
          <div className="col-sm-4">
    <div className="card border border-dark border-2">
      <div className="card-body">
        <div className='d-flex align-items-center gap-2 mb-2'>
          <div className='text-white rounded-circle fs-3 d-flex justify-content-center align-items-center' style={{width:"40px",height:"40px",backgroundColor:colors[Math.floor(Math.random()*colors.length)]}}>{props.User.name[0].toUpperCase()}</div>
          <div className='d-flex h-100 align-items-center'><div className='fs-2'>{props.User.name}</div></div>
        </div>
        <h6 className="card-title fs-5 fw-bolder">Email : {props.User.email}</h6>
        <h6 className="card-title fs-5 fw-bolder">Amount : Rs. {props.Amount}</h6>
        <h6 className="card-title fs-5 fw-bolder">Date : {new Date(props.Date).toLocaleDateString()}</h6>
        <div className="text-center">
<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#example${props.index}`}>
  Pay
</button>
<div className="modal fade" id={`example${props.index}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Pay Form</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" ref={refClose} aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form onSubmit={paid}>
  <div className="mb-3 d-flex w-100 justify-content-around align-items-center">
    <label htmlFor="amountpaid" className="form-label w-40">Amount Paid</label>
    <input type="number" className="form-control w-50 mx-2" id="amountpaid" name="amountpaid" value={amount} onChange={settingamount} aria-describedby="emailHelp"/>
  </div>
  {(error!=="")?<div className='text-danger'>{error}</div>:<></>}
    <div className="d-flex justify-content-center">
  <button type="submit" className="btn btn-primary d-flex align-items-center" disabled={showSpinner}>{(showSpinner)?<div class="spinner-border text-light mx-1" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>:<></>}Pay</button>
    </div>
</form>
      </div>
    </div>
  </div>
</div>
</div>
        
      </div>
    </div>
  </div>
    :<div></div>
  )
}
