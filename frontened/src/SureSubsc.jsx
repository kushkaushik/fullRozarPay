import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';


const SureSubsc = () => {

    const hisory = useNavigate();






    const cancelData = () => {
        axios.post(`http://localhost:9000/sub/sub_LvoX7xg1j4bm9b/cancel`,{
        
    })
    .then((res)=> {console.log(res.data)
       console.log("Hey User") 
        window.location.href = res.data.short_url;
      
    })
       
    .catch((err)=> console.log(err))

    }





    const doSomething = () =>{
        console.log("Hey User")
        const data = localStorage.getItem('item');
        window.location.href = data;
    }
    
    

  return (
    <div className="subscription-container">
      <h2>Subscription</h2>
    
      <button onClick={doSomething}>Are You Sure</button>

      <p>Already Subscribed Looking for Cancell the subscription</p>
    <button onClick={cancelData}>Cancel</button>
    </div>
  )
}

export default SureSubsc