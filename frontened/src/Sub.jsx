import React, { useState } from 'react';
import './App.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const Sub = () => {

   const hisory = useNavigate()
  const subscriptionAmount = 5000;
//create_sub


const [first, setfirst] = useState([])

    


  const handleSubscribe = () => {
    axios.post("http://localhost:9000/create_sub",{
        
    })
    .then((res)=> {console.log(res.data)
        localStorage.setItem("myid",res.data.id)
        localStorage.setItem("item",res.data.short_url)
        hisory('/Subscribe')
    })
       
    .catch((err)=> console.log(err))


  };

  return (
    <div className="subscription-container">
      <h2>Subscription</h2>
      <p>Amount: Rs {subscriptionAmount} per month</p>
      <button onClick={handleSubscribe}>Subscribe</button>

   

    </div>
  );
};
