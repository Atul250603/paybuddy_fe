import React, { useEffect, useState } from 'react'
export default function AmountToTake(props) {
  const colors=["#FF0000","#0000FF","#FF69B4"]
  return (
    (props.User!=null)?
         
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
</div>
</div>
</div>
:<></>
  )
}
