import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <div className='py-5 px-5 md:px-12 lg:px-28'>
      <div className='flex justify-between items-center'>
        <Image src={assets.logo} className='w-[130px] sm:w-auto' alt='logo' width={180} />
        <button className='flex items-center gap-2 font-medium py-1 px-3 border border-solid border-black shadow-[-7px_7px_0px_#000000]'>
          <span>Get Started</span>
          <span><Image src={assets.arrow} alt="arrow" /></span>
        </button>
      </div>
      <div className='text-center my-8'>
        <h1 className='text-3xl sm:text-5xl font-medium'>Latest Blogs</h1>
        <p className='mt-10 max-w-[740px] m-auto text-xs sm:text-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <form action="" className='flex justify-between max-w-[500px] sca sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]'>
          <input type="email" placeholder='Enter Your Email' className='pl-4 outline-none' />
          <button type='submit' className='border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white'>Subscribe</button>
        </form>
      </div>
    </div>
  )
}

export default Header