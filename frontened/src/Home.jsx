import React, { useState } from 'react'
import { border } from '@chakra-ui/react'

import Card from './Card'
import './App.css'
import axios from 'axios'



const Home = () => {

const [search, setSearch] = useState('')
const [myData, setMyData] = useState([])


    const hello = () => {
        fetch('/login', {
          method: 'GET',
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log('Error:', error);
          });
      };


  

    const getSong = ()=>{
        axios.post("http://localhost:9000/searched",{
            search
        })
        .then((res)=> {console.log(res.data.Mydata)
                
            setMyData( res.data.Mydata)
        })
           
        .catch((err)=> console.log(err))

    }
    

const checkoutHandler = async(amount)=>{


console.log("Hello")

    const {data:{key}} = await axios.get("http://localhost:9000/api/getkey")
    const {data:{order}} = await axios.post("http://localhost:9000/api/checkout",{
        amount
    })
  

    console.log(myData  + " -----------------")

  
    const options = {
        key, // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "USD",
        name: "Kush Kaushik",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "http://localhost:9000/api/paymentVerification",
        prefill: {
            name: "DJ-Side",
            email: "gaurav.kumar@example.com",
            contact: "9000090000"
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#3399cc"
        }
    };
   
    const razor = new window.Razorpay(options);
   
    razor.open();
    



}

  return (
    <>
       
        
        <nav>
  <div className="logo">
    <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png" alt="Spotify Logo" />
  </div>
  <ul className="menu">
    <li>Home</li>
    <li>About</li>
    <li>Contact</li>
  </ul>
</nav>

        
        
<div className='center'>


    <button onClick={hello} className="fancy-button">Click Me!</button>
    <input value={search} onChange={(e)=>setSearch(e.target.value)}   type='text' style={{border : "1px solid black"}}/>
    <button onClick={getSong} className="fancy-button">Search Me!</button>
    </div>



    <div className="dialog">
  <table>
    <thead>
      <tr>
        <th>Songs</th>
        <th>Artist</th>
        <th>Url</th>
        <th>SongName</th>
        <th>Payment</th>
      </tr>
    </thead>




{
    myData.map((e)=>{
        
        const temp = Math.floor(Math.random() * 101)
        return (
        
        
        <>



    <tbody>
      <tr>
        <td>{e.index}</td>
        <td>{e.artistNames}</td>
        <td><a href={e.spotifyUrl}>Link</a></td>
        <td>{e.trackName}</td>
      <td amount = {temp} onClick = {() => checkoutHandler(temp)}  style={{border:"1px solid green" ,background:"black" ,color:"green" , borderRadius:"5%" , textAlign:"center",cursor:"pointer" }}  >  {temp} RS</td>
      </tr>
      
      {/* Add more rows as needed */}
    </tbody>

            </>
        )
    })
}


</table>
</div>



        
        
        
        
        {/* <Card amount = {5000} img = {"https://burst.shopifycdn.com/photos/musical-synthesizer-keyboard.jpg?width=225&format=pjpg&exif=1&iptc=1"} checkoutHandler = {checkoutHandler}/>
        <Card amount = {3000} img = {"https://burst.shopifycdn.com/photos/breakfast-from-above.jpg?width=225&format=pjpg&exif=1&iptc=1"} checkoutHandler = {checkoutHandler}/> */}

        

       </>
  )
}

export default Home