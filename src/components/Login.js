import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import payContext from '../context/paycontext/PayContext';
import toast from 'react-hot-toast';
export default function Login() {
   const navigate=useNavigate();
    const [credentials, setcredentials] = useState({email:"",password:""});
    const [showSpinner,setshowSpinner]=useState(false);
    const settingCred = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
      };
      const login=async(e)=>{
          e.preventDefault();
          setshowSpinner(true);
          const response = await fetch(`${process.env.REACT_APP_SERVER}/auth/login`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password}) // body data type must match "Content-Type" header
          });
          const resp=await response.json();
          if(resp && resp.success){
            toast.success(resp.success);
            localStorage.setItem('token',resp.token);
            setshowSpinner(false);
            navigate('/');
          }
          else if(resp && resp.errors){
            toast.error(resp.errors);
          }
          else{
            toast.error("Some Error Occured");
          }
          setshowSpinner(false);
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
      <button type="submit" className="btn btn-primary d-flex align-items-center" disabled={showSpinner}>{(showSpinner)?<div class="spinner-border text-light mx-1" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>:<></>}Login</button>
  </form>
 </div>
  )
}
