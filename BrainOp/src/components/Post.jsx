import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Post = () => {
  const [info,setinfo]=useState([]);
  const [info2,setinfo2]=useState([])
  const [m,setm]=useState(0);
  let size=0;
  const [options,setoptions]=useState("0");
  const token=useSelector((state) => state.profile);
   const navigate =useNavigate();
  async function firstcall(){
    let url=import.meta.env.VITE_URL;
    let localtoken=localStorage.getItem("token");
    console.log(localtoken);
   if(localtoken==null){
    navigate('/');
    return
   }
    const {data}= await axios.post(url+`/post/${options}`,{},{
      headers: {
        'authorization':`Bearer ${localtoken}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
  });
 
  
  setinfo(data);
  }
  async function secondcall(){
    let url=import.meta.env.VITE_URL;
    let localtoken=localStorage.getItem("token");
    console.log(localtoken);
   if(localtoken==null){
    navigate('/');
    return
   }
    const {data}= await axios.post(url+`/post/0`,{},{
      headers: {
        'authorization':`Bearer ${localtoken}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
  });
  
  setinfo2(data);
  }
  
  useEffect(()=>{
 firstcall();
  },[options]);

  useEffect(()=>{
    secondcall();
     },[options]);



    






















  return (
    <div className="flex h-screen justify-center w-screen 
    bg-[url('https://d.furaffinity.net/art/murcielagomedula/1300569075/1300569075.murcielagomedula_apophysis-110319-5.jpg')] overflow-auto
    ">
        <select id="example-select" name="example-select" className="mt-1 block  py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 h-[50px] focus:border-indigo-500 absolute left-2 top-6" onChange={(e)=>{
        setoptions(e.target.value);
        }}>
          {info2.map((e,i)=>{
            if(i%9==0)
            return(
              <option value={i/9}>Page {i/9}</option>
            )
          })}
        
        
      </select>
    



        <div className='flex sm:w-5/6  mt-3  flex-wrap justify-center items-center gap-2'>
             
        {info.map((e)=>{
          let date=(e.updatedAt).substring(0,10);
          return (
           <div className='  w-[300px] h-[355px] before:content-[""] before:w-[300px] before:h-[350px] before:opacity-40 before:bg-zinc-500 before:absolute before:z-0 relative' >
           <div className='opacity-100  z-50 absolute w-[100%] top-0 left-0   '>
             <div className='relative flex justify-center items-center flex-col '>
             <div className=' border-x-2 w-[150px] h-[150px] border-y-2 mt-3 mb-2 rounded-full border-y-yellow-400 border-x-purple-400 relative' > 
<img src={e.image} alt="" className='absolute object-cover w-[100%] h-[100%] rounded-full'/>
     </div>
     <div className='w-[100%]'>
       <div className=' w-[90%]'>
       <button className='text-white w-[100%] m-2 p-2 bg-amber-500 rounded-md '>{e.name}</button>
       </div >
       <div className=' w-[90%]'>
       <button className='text-white w-[100%] m-2 p-2 bg-cyan-500 rounded-md '>{e.email}</button>
       </div>
       <div className=' w-[90%]'>
       <button className='text-white w-[100%] m-2 p-2 bg-purple-600 rounded-md '>Created At:  {date} </button>
       </div>

     </div>

     </div>
           </div>
          </div>

)})}
           
        </div>
    </div>
  )
}

export default Post