import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
export default function AmountToTake(props) {
  const [user, setuser] = useState(null)
  useEffect(() => {
    const getuser=async()=>{
      const response = await fetch(`${process.env.REACT_APP_SERVER}/auth/getuser`, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({id:props.User})
        });
        let msg=await response.json();
        if(msg && !msg.errors){
          setuser(msg);
        }
        else if(msg && msg.errors){
          toast.error(msg.errors);
        }
        else{
          toast.error("Some Error Occured");
        }
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
