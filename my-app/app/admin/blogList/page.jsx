"use client"
import BlogTableItem from '@/components/AdminComponents/BlogTableItem'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function page() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get('/api/blog');
    setBlogs(response.data.blogs);
  }

  useEffect(() => {
    fetchBlogs();
  })

  const deleteBlog = async (mongoId) => {
    const response = await axios.delete('/api/blog', {
      params: {
        id: mongoId
      }
    })

    if (response) {
      toast.success(response.data.message);
      fetchBlogs();
    }
  }



  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All Blogs</h1>
      <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
        <table className='w-full text-sm text-gray-500 '>
          <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='hidden sm:block px-6 py-3'>Author Name</th>
              <th scope='col' className=' px-6 py-3'>Blog Title</th>
              <th scope='col' className='px-6 py-3'>Blog Date</th>
              <th scope='col' className=' px-6 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((item, index) => {
              return <BlogTableItem key={index} mongoId={item._id} title={item.title} author={item.author} authorImg={item.authorImg} date={item.date} deleteBlog={deleteBlog} />
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default page