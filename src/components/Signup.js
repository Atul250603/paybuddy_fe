import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
export default function Signup() {
  const navigate=useNavigate();
  const [credentials, setcredentials] = useState({name:"",email:"",password:""});
  const setCredentials=(e)=>{
    setcredentials({...credentials, [e.target.name] : e.target.value});
  }
  const signup=async(e)=>{
    e.preventDefault();
    const response = await fetch("https://paybuddy.onrender.com/auth/createuser", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password}) // body data type must match "Content-Type" header
    });
    const resp=await response.json();
    navigate('/login');
}
  return (
      <div  className='container mt-4 col-6'>
          <h3>Signup Form</h3>
          <form onSubmit={signup}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" name="name" id="name" aria-describedby="emailHelp" onChange={setCredentials} value={credentials.name} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={setCredentials} value={credentials.email} required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" id="exampleInputPassword1" onChange={setCredentials} value={credentials.password} required/>
  </div>
  <button type="submit" className="btn btn-primary">Signup</button>
</form>
      </div>
  )
}
