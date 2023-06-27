import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import payContext from '../context/paycontext/PayContext';
export default function Login() {
   const navigate=useNavigate();
    const [credentials, setcredentials] = useState({email:"",password:""});
    const settingCred = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
      };
      const login=async(e)=>{
          e.preventDefault();
          const response = await fetch("https://paybuddy.onrender.com/auth/login", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password}) // body data type must match "Content-Type" header
          });
          const resp=await response.json();
          localStorage.setItem('token',resp.token);
          navigate('/');
      }
  return (
      <div className='container mt-4 col-6'>
          <h3>Login Form</h3>
          <form onSubmit={login}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name="email" id="exampleInputEmail1"  onChange={settingCred} aria-describedby="emailHelp" value={credentials.email} required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" id="exampleInputPassword1" onChange={settingCred} value={credentials.password} required/>
  </div>
  <button type="submit" className="btn btn-primary">Login</button>
</form>
      </div>
  )
}
