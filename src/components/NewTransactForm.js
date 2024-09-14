import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';
export default function NewTransactForm(props) {
  const reflCose = useRef(null)
  const [data, setdata] = useState({email:"",amount:""});
  const [showSpinner,setshowSpinner]=useState(false);
  const{transaction,settransaction}=props;
  const settingData=(e)=>{
    setdata({...data,[e.target.name]:e.target.value});
  }
  const makenewtransact=async(e)=>{
    e.preventDefault();
    setshowSpinner(true);
    const idx=transaction.findIndex((element)=>{return element.user.email===data.email});
    const response = await fetch(`${process.env.REACT_APP_SERVER}/transact/createtotake`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'authToken':localStorage.getItem('token')
            },
            body: JSON.stringify({email:data.email,amount:data.amount})
          });
      const resp=await response.json();
      if(resp && resp.success){
        if(idx>=0){
          let temp=[...transaction];
          temp[idx].amount+=Number(data.amount);
          settransaction(temp);
        }
        else{
          let temp=[...transaction];
          temp.push(resp.transact);
          settransaction(temp);
        }
        toast.success(resp.success);
      }
      else if(resp && resp.errors){
        toast.error(resp.errors);
      }
      else{
        toast.error("Some Error Occured");
      }
      setshowSpinner(false);
      reflCose.current.click();
  }
  return (
    <div className='mx-3'>
    <button type="button" className="btn btn-primary d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Add New Transaction
      <svg xmlns="http://www.w3.org/2000/svg" className="mx-1" height="20" width="20" viewBox="0 0 448 512"><path fill="#ffffff" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
  </button>
  <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Add New Transaction</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" ref={reflCose} aria-label="Close" />
        </div>
        <div className="modal-body">
        <form onSubmit={makenewtransact}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Payee Email</label>
    <input type="email" className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={settingData} value={data.email} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="amount" className="form-label">Amount</label>
    <input type="number" className="form-control" name="amount" id="amount" onChange={settingData} value={data.amount} required/>
  </div>
  <div className='text-center'>
  <button type="submit" className="btn btn-primary d-flex align-items-center" disabled={showSpinner}>{(showSpinner)?<div class="spinner-border text-light mx-1" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>:<></>}Add</button>
  </div>
</form>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}
