const app = require('./app')
const Razorpay = require('razorpay')

 const instance = new Razorpay({
    key_id:"rzp_test_4evzawVt5Ct89r",
    key_secret:"dhC5xWo8VLwAUOpVaZ1EAiwh",
  });


app.listen(7000,()=>{
    console.log(`server is running at 7000`)
})




module.exports = instance
