"use client"
import SubcriptionTableItem from '@/components/AdminComponents/SubcriptionTableItem'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function page() {
  const [emails, setEmails] = useState([]);

  const fetchEmails = async () => {
    const response = await axios.get('/api/email');
    setEmails(response.data.emails);
  }

  const deleteEmails=async(mongoId)=>{
    const response=await axios.delete('/api/email',{
      params:{
        id:mongoId
      }
    })
    if(response.data.success){
      toast.success(response.data.message);
      fetchEmails();
    }else{
      toast.error("Error in email deletion");
    }
  }

  useEffect(() => {
    fetchEmails();
  }, [])

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All Subscriptions</h1>
      <div className='relative max-w-[600px] h-[80hv] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-left text-gray-700 uppercase bg-gray-50'>
            <tr >
              <th scope='col' className='px-6 py-3'>Email Subcription</th>
              <th scope='col' className='px-6 py-3 hidden sm:block'>Date</th>
              <th scope='col' className='px-6 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((item, index) => {
              <SubcriptionTableItem key={index} email={item.email} mongoId={item._id} date={item.Date} deleteEmails={deleteEmails}/>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default page