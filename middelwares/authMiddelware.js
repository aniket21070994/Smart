import  Jwt  from "jsonwebtoken";
import usermodel from "../models/usermodel.js";
//protected rout from token base
export const requireSigneIn=  (req,res,next)=>{
     try {
                const decode=Jwt.verify(req.headers.authorization,process.env.JWT_SECRET);
                next();
         
     }
     
     catch (error) {
                console.log(error);
     }
}
//Admin access
export  const adminCheck=async(req, res, next) =>{
    console.log(req.body);
    const admin=await usermodel.findOne(req.email);
    if(admin.role){
        return next()
    }else{
       return  res.status(401).send({msg:"You are not Admin"})
    }
};