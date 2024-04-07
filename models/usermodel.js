import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,unique:true,lowercase: true, required: true },
    password:{type:String,required:true},
    phone:{type:String,required:true},
    question:{
        type:String,
        required:true
    },
    role:{type:Number,default:0}, // 10 -
},{timestamps:true});
// Hash the password before saving it to the



export default mongoose.model("users",userSchema);