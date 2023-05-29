import React from 'react'
import {Box,Stack} from '@chakra-ui/react'
import Card from './Card'
import axios from 'axios'
const Home = () => {



const checkoutHandler = async(amount)=>{
    const {data:{key}} = await axios.get("http://localhost:7000/api/getkey")
    const {data:{order}} = await axios.post("http://localhost:7000/api/checkout",{
        amount
    })
  
 

    const options = {
        key, // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Kush Kaushik",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "http://localhost:7000/api/paymentVerification",
        prefill: {
            name: "Gaurav Kumar",
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
    <Box>
        <Stack direction={"row"}>
        <Card amount = {5000} img = {"https://burst.shopifycdn.com/photos/musical-synthesizer-keyboard.jpg?width=225&format=pjpg&exif=1&iptc=1"} checkoutHandler = {checkoutHandler}/>
        <Card amount = {3000} img = {"https://burst.shopifycdn.com/photos/breakfast-from-above.jpg?width=225&format=pjpg&exif=1&iptc=1"} checkoutHandler = {checkoutHandler}/>

        </Stack>

        </Box>
  )
}

export default Home