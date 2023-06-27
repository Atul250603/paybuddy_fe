import React, { useEffect, useState } from 'react'
export default function AmountToTake(props) {
  const [user, setuser] = useState(null)
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
  
  return (
    (user!=null)?
         
    <div className="col-sm-4">
<div className="card">
<div className="card-body">
  <h6 className="card-title">Payee : {user.user.name}</h6>
  <h6 className="card-title">Payee Email : {user.user.email}</h6>
  <h6 className="card-title">Amount : {props.Amount}</h6>
  <h6 className="card-title">Date : {props.Date}</h6>
</div>
</div>
</div>
:<></>
  )
}
