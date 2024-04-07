import { verify } from "password-hash";
import { encriptPassword } from "../helpers/authHelper.js";
import usermodel from "../models/usermodel.js";
import  Jwt  from "jsonwebtoken";
export const  registerController=async(req,res)=>{
    try{
             const {name,email,password,phone,rol}=req.body;
             
    //validation
    

             if(!name)
              {
                return res.send({error:"name required"});
              }

             if(!email)
             {
                return res.send({error:"email required"});
             }
             if(!password)
             {
                return res.send({error:"password required"});
             }
             if(!phone)
             {
                return res.send({error:"phone required"});
             }
            
            
            
             
    //check user
             const exisitingUser=await usermodel.findOne( { email: email });
    //exisiting user
             if(exisitingUser){
                return res.status(200).send({
                    success:true,
                    message:'Alredy Register please login',
                })
             }
    //register user
            console.log(req.body);
            const hpassword=encriptPassword(password);
            console.log(hpassword);
            let newuser={
               name : name , 
               email : email ,  
               password :hpassword , 
               phone : phone
            };
            registerSave();
              async function registerSave()
             {
                const user= await usermodel.create(newuser);
                return res.status(201).send({
                success:true,
                message:'User Register Sucessfully',
                user
            })};
            
             
    }catch{
        console.log(err=>console.log(err));
        res.status(500).send(
            {
                success:false,
                message:"error in registeration",
                
            }
        )
    }

}

export const loginController=async(req,res)=>
{
    try {
        const {email,password}=req.body;
        //validation
        if(!email||!password)
        {
            return res.status(404).send(
                {
                    success:false,
                    message:'Invalid email or password'
                }
            )
        }
         //check user
         const user=await  usermodel.findOne({email});
         if(!user)
         {
            return res.status(404).send(
                {
                    success:false,
                    message:'Email is not match'
                }
            )
         }
        const match=await verify(password,user.password);
        //check password is match or not
        if(!match)
        {
            return res.status(200).send({
                success:false,
                message:'Invalid Password'
            })
        }
        //token
        const token=  Jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.status(200).send({
            success:true,
            message:'login Sucessfully',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                

            },
            token
        });

       }
       catch (error) {
        console.log(error);
        res.status(500).send(
            {
                success:false,
                message:'Error in login',
                error
            }
        )
        
      }

};
//test controller
export const testContropller=(req,res)=>{
    console.log('safe called');
    res.send('protected rout');
    
}

//admin controller
export const adminController=(req,res)=>{
    res.send("Admin Panel");
}
export const forgotpasswordController=async (req,res)=>{
    //code to send reset password link
    try{

        const {email,question,newpassword}=req.body;
        if(!email)
        {
            res.status(400).send({
                message:"email is required"
            })
        }
        if(!question)
        {
            res.status(400).send({
                message:"qestion is required"
            })
        }
        if(!newpassword)
        {
            res.status(400).send({
                message:"new password is required"
            })
        }
        //chrck qestion
        const user=await usermodel.findOne({email,question})
        if(!user)
        {
          return res.status(404).send({
            success:false,
            message:"wrong email or answer"
          })  
        }
    }
    catch(error){
      console.log(error);
        res.status(500).send({
            success:false,
            message:"something went wrong",
            error
        })
    }

    
}