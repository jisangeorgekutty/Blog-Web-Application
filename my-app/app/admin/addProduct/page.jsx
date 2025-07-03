"use client"
import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useState } from 'react'

function page() {
    const [image,setImage]=useState(false);
  return (
    <>
    <form className='pt-5 px-5 sm:pt-12 sm:pl-16'>
        <p className='text-xl'>Upload Thumbnail</p>
        <label htmlFor='image'>
            <Image className='mt-4' src={!image ? assets.upload_area : URL.createObjectURL(image)} alt='' width={140} height={70}/>
        </label>
        <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' className='hidden' required/>

        <p className='text-xl mt-4'>Blog Title</p>
        <input className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Type here..' name="" id="" required/>
        <p className='text-xl mt-4'>Blog Description</p>
        <textarea className='w-full sm:w-[500px] mt-4 px-4 py-3 border' rows={6} type="text" placeholder='Write content here..' name="" id="" required/>
        <p className='text-xl mt-4'>Blog Category</p>
        <select className='w-40 mt-4 px-4 py-3 border text-gray-500' name="category" id="">
            <option value="Startup">Startup</option>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
        </select>
        <br/>
        <button type='submit' className='mt-8 w-40 h-12 bg-black text-white'>Add Blog</button>
    </form>
    </>
  )
}

export default page