import mongoose from "mongoose";
//connecting mongo 
const connectDB=async()=>{
await  mongoose.connect(process.env.MONGO_URL)
}

 
export default  connectDB;


