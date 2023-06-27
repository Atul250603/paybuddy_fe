import React, { useRef, useState } from 'react'
export default function NewTransactForm(props) {
  const reflCose = useRef(null)
  const [data, setdata] = useState({email:"",amount:""});
  const{topay,settopay}=props;
  const settingData=(e)=>{
    setdata({...data,[e.target.name]:e.target.value});
  }
  const makenewtransact=async(e)=>{
    e.preventDefault();
    const userresponse=await fetch("https://paybuddy.onrender.com/auth/getuserbymail",{
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({email:data.email})
    })
    const userresp=await userresponse.json();
    const userId=userresp[0]._id;
    const idx=topay.findIndex((element)=>{return element.nextUser===userId});
    const response = await fetch("https://paybuddy.onrender.com/transact/topay", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              'authToken':localStorage.getItem('token')
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({email:data.email,amount:data.amount}) // body data type must match "Content-Type" header
          });
      const resp=await response.json();
      if(idx>=0){
        let temp=[...topay];
        temp[idx].amount+=Number(data.amount);
        settopay(temp);
      }
      else{
        let temp=[...topay];
      temp.push(resp.transact);
      settopay(temp);
      }
      reflCose.current.click();
  }
  return (
    <div className='mx-3'>
    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
</svg>
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
    <label htmlFor="exampleInputEmail1" className="form-label">Beneficiary Email</label>
    <input type="email" className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={settingData} value={data.email} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="amount" className="form-label">Amount</label>
    <input type="number" className="form-control" name="amount" id="amount" onChange={settingData} value={data.amount} required/>
  </div>
  <div className='text-center'>
  <button type="submit" className="btn btn-primary">Add</button>
  </div>
</form>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}
