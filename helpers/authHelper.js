
//use bcrypt to hash and compair password from data base
import passwordHash from 'password-hash'
//encrept Password function
export const  encriptPassword=(password)=> {
    const hpass= passwordHash.generate(password);
    console.log(hpass);
    return hpass;
}


//Compare  password with the database 
export const comparePassword =async(password,hashPassword)=>{
   return  passwordHash.verify(password, hashPassword);
};