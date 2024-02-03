import { useState } from "react";
import PayContext from "./PayContext";
const PayState=(props)=>{
    const [transaction, settransaction] = useState([]);
    const amounttotake=async()=>{
    const response = await fetch("https://paybuddy.onrender.com/transact/totake", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'authToken': localStorage.getItem('token')
          // 'Content-Type': 'application/x-www-form-urlencoded',
        }
      });
      settransaction(await response.json());
    }
    settransaction([10]);

    return(
        <PayContext.Provider value={{transaction}}>
            {props.children}
        </PayContext.Provider>
    );
}
export default PayState;