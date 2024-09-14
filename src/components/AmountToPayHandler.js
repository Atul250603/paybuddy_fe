import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AmountToPay from "./AmountToPay";
import { useNavigate } from "react-router-dom";

function AmountToPayHandler(){
    const [topay,settopay]=useState([]);
    const [status,setstatus]=useState(false);
    const navigate=useNavigate();
    useEffect(()=>{
        const helper=async()=>{
            if(!localStorage.getItem('token')){
                navigate('/home');
                return
            }
        const fetchalltransactions=async()=>{
            const response = await fetch(`${process.env.REACT_APP_SERVER}/transact/fetchalltransact`, {
                method: 'POST',
                headers: {
                  'authToken': localStorage.getItem('token')
                }
              });
              let resp=await response.json();
              if(resp && !resp.errors){
                settopay(resp);
              }
              else if(resp &&resp.errors){
                toast.error(resp.errors);
              }
              else{
                toast.error("Some Error Occured");
              }
            }
            await fetchalltransactions();
            setstatus(true);
        }
        helper();
    },[])

    return(
        <div>
            <div className="my-2">
                <h3 className="fw-bold fs-2">Amount To Pay</h3>
                {(status)?<div className="row">
                {(topay&&topay.length>0 && topay.length!==undefined)?topay.map((temp,index)=>{
                  return <AmountToPay User={temp.nextUser} Amount={temp.amount} Date={temp.date} key={temp._id} index={index} topay={topay} settopay={settopay}/>
                }):<div className="text-center">No Records Yet....</div> }
                </div>
                :<div className="text-center">Loading....</div>}
                </div>
            
        </div>
    )
}

export default AmountToPayHandler;