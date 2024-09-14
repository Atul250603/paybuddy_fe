import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AmountToTake from "./AmountToTake";
import { useNavigate } from "react-router-dom";

function AmountToTakeHandler({transaction,settransaction}){
    const [status,setstatus]=useState(false);
    const navigate=useNavigate();
    const amounttotake=async()=>{
        const response = await fetch(`${process.env.REACT_APP_SERVER}/transact/totake`, {
            method: 'POST',
            headers: {
              'authToken': localStorage.getItem('token')
            }
          });
          let resp=await response.json();
          if(resp && !resp.errors){
            settransaction(resp.transact);
          }
          else if(resp &&resp.errors){
            toast.error(resp.errors);
          }
          else{
            toast.error("Some Error Occured");
          }
    
    }
    useEffect(()=>{
        async function helper(){
            if(!localStorage.getItem('token')){
                navigate('/home');
                return;
            }
            await amounttotake();
            setstatus(true);
        }
        helper();
    },[])
    return(
        <div>
            <div className="my-2">
                <h3 className="fw-bold fs-2">Amount To Take</h3>
                    {(status)?<div className="row">
                    {(transaction && transaction.length>0)?transaction.map((temp,index)=>{
                      return <AmountToTake User={temp.user} Amount={temp.amount} Date={temp.date} key={temp._id}/>
                    }):<div className="text-center">No Records Yet....</div> }
                    </div>:<div className="text-center">Loading....</div>}
                </div>
        </div>
    )
}

export default AmountToTakeHandler;