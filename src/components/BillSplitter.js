import React, { useState } from 'react'
export default function BillSplitter() {
    const [data, setdata] = useState({amount:"",count:""});
    const [amount, setamount] = useState(0);
    const settingdata=(e)=>{
        setdata({...data,[e.target.name]:e.target.value});
    }
    const splitting=(e)=>{
        e.preventDefault();
        let tempamount=Number(data.amount)/Number(data.count);
        setamount(tempamount);
    }
  return (
      <div className='container mt-4 w-50'>
          <h5 className='text-center'>Split Your Bill</h5>
          <form onSubmit={splitting}>
  <div className="mb-3">
    <label for="amount" className="form-label">Amount</label>
    <input type="number" className="form-control" name="amount" id="amount" aria-describedby="emailHelp" onChange={settingdata} value={data.amount}/>
  </div>
  <div className="mb-3">
    <label for="count" className="form-label">Count of People</label>
    <input type="number" className="form-control" name="count" id="count" onChange={settingdata} value={data.count}/>
  </div>
  <div className='text-center my-2'>
  <button type="submit" className="btn btn-primary">Split</button>
  </div>
</form>
<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon3">Amount Per Head</span>
  <input className="form-control" type="text" value={amount} aria-label="readonly input example" readonly></input>
</div>
      </div>
  )
}
