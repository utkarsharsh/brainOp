import React, { useRef, useState } from 'react';
import { Form, useForm } from 'react-hook-form';
import add from '../assets/add.svg'
import { useDispatch } from 'react-redux';
import { increment } from '../store/createslice';
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom"
import axios from 'axios'
const Signup = () => {
  const navigate=useNavigate()
  const [password,setpassword]=useState('')
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [successMessage, setSuccessMessage] = useState('');
  const [token, setToken] = useState("");
  const [image,setimage]=useState('');
  const [imageurl,setimageurl]=useState("");
  const Dispatch =useDispatch();
  const key=import.meta.env.VITE_KEY;
  
 
  



  const onSubmit = async (e) => {
   if(token=="") {
    alert("mark the reChapche");
    return;
   }
   if(imageurl==""){
    alert("wait for image to upload");
    return;
   }
      e={...e,image:imageurl};
      let x=e;
    Dispatch(increment(x));
    e={...e,image:imageurl,token};
    console.log(import.meta.env.VITE_URL);
    let url = import.meta.env.VITE_URL;
  let signup="/signup"
  url =url.concat(signup);
  console.log(url);
     const {data}= await axios.post(url,e,{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
  });
  setSuccessMessage(data.status);
  if(data.status=="Succesfull"){
    localStorage.setItem("token",data.token);
    navigate("/post");
  };
  };

  const refer=useRef();
  async function handleurlchange(e){
      let x=e.target.files[0];
    const blob = new Blob([x], { type: x.type });
    const objectURL = URL.createObjectURL(blob);
    setimage(objectURL);
    const dat=new FormData();
    dat.append("file",x);
    dat.append("upload_preset","Brainop");
    const {data} =await axios.post("https://api.cloudinary.com/v1_1/disggmk1g/image/upload",dat) ;
     setimageurl(data.url);
  }
  
  

  function setTokenFunc(getToken)  {
      setToken(getToken);
  };


  


  return (
   
 
    <div className="flex h-screen justify-center w-screen 
    bg-[url('https://d.furaffinity.net/art/murcielagomedula/1300569075/1300569075.murcielagomedula_apophysis-110319-5.jpg')]
    ">
    <div className="max-w-md mx-auto mt-8 p-6  rounded shadow-lg sm:bg-white sm:h-6/6 mb-5 overflow-auto  w-[100%]">
      <h2 className="text-2xl mb-4 text-center text-white sm:text-blue-500 sm:font-bold">Sign Up</h2>
      {successMessage && (
        <div className="bg-green-200 text-green-700 p-3 rounded mb-4">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="file" ref={refer} className='hidden' onChange={handleurlchange}/>
        <div className='flex justify-center align-middle mb-4 mt-4 cursor-pointer' onClick={()=>{
            refer.current.click();
        }}>
             <div className='w-[100px] h-[100px] rounded-full border-r-yellow-300  border-l-yellow-300 border-b-violet-300 border-t-violet-300 border-4 bg-white flex justify-center items-center'>
            
         {image == '' ?  <img src={add} alt="" srcset="" className='w-[40px] h-[40px]' />:  <img src={image} alt="" srcset="" className='w-[100%] h-[100%] rounded-full ' />}   
             </div>
        </div>
        <div className="mb-4">
          <input type="text" placeholder="Email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} className="w-full p-2 border-2 border-cyan-500 rounded" />
          {errors.email && errors.email.type === "required" && <p className="text-red-500">Email is required</p>}
          {errors.email && errors.email.type === "pattern" && <p className="text-red-500">Invalid email format</p>}
        </div>
        <div className="mb-4">
          <input type="password" placeholder="Password" {...register("password", { required: true, minLength: 6 })} className="w-full p-2 border-2 border-cyan-500 rounded" onChange={(e)=>{setpassword(e.target.value)}}/>
          {errors.password && errors.password.type === "required" && <p className="text-red-500">Password is required</p>}
          {errors.password && errors.password.type === "minLength" && <p className="text-red-500">Password must be at least 6 characters</p>}
        </div>
        <div className="mb-4">
          <input type="password" placeholder="Confirm Password"  {...register("confirmPassword", { required: true, validate: value => value == password })} className="w-full p-2 border-2 border-cyan-500 rounded" />
          {errors.confirmPassword && errors.confirmPassword.type === "required" && <p className="text-red-500">Confirm Password is required</p>}
          {errors.confirmPassword && errors.confirmPassword.type === "validate" && <p className="text-red-500">Passwords must match</p>}
        </div>
        <div className="mb-4">
          <input type="text" placeholder="Name" {...register("name",{required:true})} className="w-full p-2 border-2 border-cyan-500 rounded" />
          {errors.name && <p className="text-red-500">Name is required</p>}
        </div>
        
        <div className="mb-4">
          <label className="flex items-center">
            <input type="checkbox" {...register("termsAndConditions", { required: true })} className="mr-2" />
            <span className=" text-rose-50 sm:text-black font-semibold" >I accept the Terms & Conditions</span>
          </label>
          {errors.termsAndConditions && <p className="text-red-500">Terms & Conditions must be accepted</p>}
        </div>
        <ReCAPTCHA
    sitekey={key}
    onChange={setTokenFunc}
  />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-3">Sign Up</button>       
      </form>
    </div></div>
    
  );
};

export default Signup;
