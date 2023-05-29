const express = require('express')
const payment = require('./routes/payment')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const cors = require('cors')
app.use(cors())
app.use('/api',payment)
app.get('/api/getkey',(req,res)=>{
    res.status(200).json({key:"rzp_test_4evzawVt5Ct89r"})
})






module.exports = app

