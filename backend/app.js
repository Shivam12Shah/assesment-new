const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config();

const { strippayemnt, stripeWebhook } = require('./controller/paymentconteoller');
const { connectdb } = require('./db/connect');
connectdb();
app.use(cors());
app.use(express.json()); // To parse JSON bodies for other routes

app.get("/", (req, res) => { res.send("API is running...")})

app.post("/payment-init", strippayemnt)

app.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

app.listen((3000),()=>{
    console.log("server is runninf at port 3000")
})