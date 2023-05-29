const Razorpay = require('razorpay')
const crypto = require('crypto')
 const instance = new Razorpay({
    key_id:"rzp_test_4evzawVt5Ct89r",
    key_secret:"dhC5xWo8VLwAUOpVaZ1EAiwh",
  });

const checkout = async(req,res) =>{
    try{

    var options = {
        amount:Number(req.body.amount * 100),  
        currency: "INR",
        receipt: "order_rcptid_11"
      };
    const order = await instance.orders.create(options) 
        console.log(order);
      res.status(200).json({
        success:true,
        order
      })}
      catch(err){
     return res.json(err)
      }
}



const paymentVerification = async(req,res) =>{
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;

    let body=razorpay_order_id + "|" + razorpay_payment_id;

    
    var expectedSignature = crypto.createHmac('sha256', 'dhC5xWo8VLwAUOpVaZ1EAiwh')
                                    .update(body.toString())
                                    .digest('hex');
 
const issame = expectedSignature === razorpay_signature
if(issame){
        res.redirect(`http://localhost:3000/success`)
}else{
    res.status(200).json({success:false
    })
}


    
}





module.exports = {checkout,paymentVerification}