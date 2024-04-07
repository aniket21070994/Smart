
//requre module section
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import  authRouts from './routes/authRout.js'
dotenv.config()

//rest object
const app= express();

//Connect DB
connectDB().then(()=>console.log('connected db')).catch(()=>console.log('not connected db'));

//middelwares secton
app.use(express.json());

//routes
app.use("/api/v1/auth",authRouts);




//api ssection

app.get('/',(req,res)=>{
    res.send("Welcome to Home Page");
});

//Port
const port=process.env.PORT || 5000;
//run listen
app.listen(port,()=>{
    console.log(`listenning at port ${port}`)
});

