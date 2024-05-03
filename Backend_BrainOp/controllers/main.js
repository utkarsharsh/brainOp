import users from "../schema/BrainOpUsers.js"
import bcrypt from "bcrypt"
import axios from "axios"
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()
export const SignUp=async (req,res,next)=>{
    const {name,password,email,image,token}=req.body;
  try{    axios.post("https://www.google.com/recaptcha/api/siteverify",{
        secret:process.env.SECRETROBO,
        response:token
    },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(({data})=>
    {
        console.log(data)
        if(!data.success){
            res.send({staus:"Invalid Recapcha"});
        }
    }).catch((err)=>{
        res.send({staus:"Invalid Recapcha"})
    }) 
    
    
}
catch (err){
res.send({status:"Invalid Recapcha"});
}
    
    if((await users.find({email:req.body.email})).length==0){
      
       const token=jwt.sign({email},process.env.SECRETKEY);
       
      
       bcrypt.hash(password,10,async (err,hash)=>{
        if(err){
            res.send({status:"Something went wrong"});
        }
        else {
            const use=new users({name,password:hash,email,image});
            await use.save();
            res.send({status:"Succesfull",token});
        }
       });
    }
    else {
        res.send({status:"User already exits"});
    }
}








export const Post= async (req,res)=>{
       const token =req.headers.authorization;
       
       console.log(token)

       let t= token.split(" ");
       console.log(t);
       const pages=req.params.page;
       console.log(pages)
       try{
    const verify=  jwt.verify(t[1],process.env.SECRETKEY);}
    catch (err){
  res.send(false)
    }
   
   if(pages!=0){
    let x=await users.find();
    console.log("data",x.length);
    let data=[]
    for(let i=(pages-1)*10;i<x.length && i<(pages*10);i++){
     data.push(x[i]);
    }
        console.log(data.length);
    res.send(data);

   }
   else{
    console.log("we");
   const data = await users.find();
   res.send(data);
}
}