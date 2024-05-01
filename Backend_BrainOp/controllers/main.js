import users from "../schema/BrainOpUsers.js"
import bcrypt from "bcrypt"
export const SignUp=async (req,res,next)=>{
    const {name,password,email,image}=req.body;
    
    if((await users.find({email:req.body.email})).length==0){
      
       const token=jwt.sign({email},process.env.SECRETKEY);
       
      
       bcrypt.hash(password,10,async (err,hash)=>{
        if(err){
            res.send("Something went wrong");
        }
        else {
            const use=new users({name,password:hash,email,image});
            await use.save();
            res.send({status:"Succesfull",token});
        }

       })


    }
    else {
        res.send("User already exits");
    }


}