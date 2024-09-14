import React from 'react';
import { Link, useNavigate } from "react-router-dom";
export default function Navbar() {
  let navigate=useNavigate();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container-fluid">
    
          <Link className="navbar-brand" to="/">PayBuddy</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav d-flex w-100">
              <div className='d-flex w-50'>
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              <Link className="nav-link" to="/billsplit">Bill Splitter</Link>
              </div>
              <div className='d-flex justify-content-end w-50'>
              {(!localStorage.getItem('token'))?<><div><Link className="btn btn-primary mx-2" to="/login">Login</Link></div>
              <div><Link className="btn btn-primary" to="/signup">Signup</Link></div></>:<><button type="button" className="btn btn-primary" onClick={()=>{localStorage.removeItem('token'); navigate('/home')}}>Logout</button></>}
              </div>
            </div>
          </div>
        </div>
      </nav>
  )
}
