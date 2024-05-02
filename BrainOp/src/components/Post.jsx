import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const Post = () => {
  const [data,setdata]=useState([]);
  const token=useSelector()




    






















  return (
    <div className="flex h-screen justify-center w-screen 
    bg-[url('https://d.furaffinity.net/art/murcielagomedula/1300569075/1300569075.murcielagomedula_apophysis-110319-5.jpg')] overflow-auto
    ">
        <div className='flex sm:w-5/6  mt-3  flex-wrap'>
             

             <div className='  w-[300px] h-[355px] before:content-[""] before:w-[300px] before:h-[350px] before:opacity-40 before:bg-zinc-500 before:absolute before:z-0 relative' >
              <div className='opacity-100  z-50 absolute w-[100%] top-0 left-0   '>
                <div className='relative flex justify-center items-center flex-col '>
                <div className=' border-x-2 w-[150px] h-[150px] border-y-2 mt-3 mb-2 rounded-full border-y-yellow-400 border-x-purple-400 relative' > 
<img src="https://m.media-amazon.com/images/I/81OcZThCE9L._AC_UF1000,1000_QL80_.jpg" alt="" className='absolute object-cover w-[100%] h-[100%] rounded-full'/>
        </div>
        <div className='w-[100%]'>
          <div className=' w-[90%]'>
          <button className='text-white w-[100%] m-2 p-2 bg-amber-500 rounded-md '>Name</button>
          </div >
          <div className=' w-[90%]'>
          <button className='text-white w-[100%] m-2 p-2 bg-cyan-300 rounded-md '>Email</button>
          </div>
          <div className=' w-[90%]'>
          <button className='text-white w-[100%] m-2 p-2 bg-purple-600 rounded-md '>Created At: </button>
          </div>

        </div>

        </div>
              </div>
             </div>
        </div>
    </div>
  )
}

export default Post