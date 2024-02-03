import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
export default function AmountToPay(props) {
  const [user, setuser] = useState(null)
  const [amount, setamount] = useState(0);
  const [error, seterror] = useState("");
  const [showSpinner,setshowSpinner]=useState(false);
  const{topay,settopay}=props;
  const refClose = useRef(null)
  const settingamount=(e)=>{
    setamount(e.target.value);
  }
  useEffect(() => {
    const getuser=async()=>{
      const response = await fetch(`${process.env.REACT_APP_SERVER}/auth/getuser`, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({id:props.User})
        });
        let msg=await response.json();
        if(msg && !msg.errors){
          setuser(msg);
        }
        else if(msg && msg.errors){
          toast.error(msg.errors);
        }
        else{
          toast.error("Some Error Occured");
        }
    }
    getuser();
  }, [])
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
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({email:user.user.email,amount:amount}) // body data type must match "Content-Type" header
      });
      let resp=await response.json(); 
      if(resp && resp.success){
        toast.success(resp.success)
        const tempAmount=props.Amount-amount;
        if(tempAmount==0){
          const temptopay=[...topay];
          const idx=temptopay.findIndex((element)=>{return element.nextUser===user.user._id});
          let removed= temptopay.splice(idx,1);
          settopay(temptopay);
        }
        else{
          const temptopay=[...topay];
          const idx=temptopay.findIndex((element)=>{return element.nextUser===user.user._id});
          temptopay[idx].amount-=amount;
          settopay(temptopay);
        }
      }
      setshowSpinner(false);
      refClose.current.click();
    }
  }
  return (
    (user!=null)?
         
          <div className="col-sm-4">
    <div className="card">
      <div className="card-body">
        <h6 className="card-title">Beneficiary : {props.Name}</h6>
        <h6 className="card-title">Beneficiary Email : {user.user.email}</h6>
        <h6 className="card-title">Amount : {props.Amount}</h6>
        <h6 className="card-title">Date : {props.Date}</h6>
        <div className="text-center">
<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#example${props.index}`}>
  Paid
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
    </div>:<></>}Paid</button>
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
    :<></>
  )
}
