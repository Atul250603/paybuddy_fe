import React, { useEffect, useRef, useState } from 'react'
export default function AmountToPay(props) {
  const [user, setuser] = useState(null)
  const [amount, setamount] = useState(0);
  const [error, seterror] = useState("");
  const{topay,settopay}=props;
  const refClose = useRef(null)
  const settingamount=(e)=>{
    setamount(e.target.value);
  }
  useEffect(() => {
    const getuser=async()=>{
      const response = await fetch("https://paybuddy.onrender.com/auth/getuser", {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({id:props.User})
        });
        setuser(await response.json());
    }
    getuser();
  }, [])
  const paid=async(e)=>{
    e.preventDefault();
    if(amount<=0 || amount>props.Amount){
      seterror("Invalid Amount");
    }
    else{
      const tempAmount=props.Amount-amount;
      if(tempAmount==0){
        const temptopay=[...topay];
        const idx=temptopay.findIndex((element)=>{return element.nextUser===user.user._id});
        let removed= temptopay.splice(idx,1);
        settopay(temptopay);
        refClose.current.click();
      }
      else{
        const temptopay=[...topay];
        const idx=temptopay.findIndex((element)=>{return element.nextUser===user.user._id});
        temptopay[idx].amount-=amount;
        settopay(temptopay);
        refClose.current.click();
      }
      const response = await fetch("https://paybuddy.onrender.com/transact/paid", {
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
  <button type="submit " className="btn btn-primary mt-2">Paid</button>
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
