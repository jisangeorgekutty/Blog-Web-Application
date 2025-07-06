"use client"
import { assets } from '@/assets/assets'
import axios from 'axios';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function page() {
    const [image, setImage] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [hasMounted, setHasMounted] = useState(false);
    const [data, setData] = useState({
        title: "",
        description: "",
        category: "Startup",
        author: "Alex",
        authorImg: "/profile_icon.png",
    })

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        if (image) {
            const url = URL.createObjectURL(image);
            setPreviewUrl(url);

            // Cleanup to avoid memory leaks
            return () => URL.revokeObjectURL(url);
        }
    }, [image])

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }));
        console.log(data);
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('author', data.author);
        formData.append('authorImg', data.authorImg);
        formData.append('image', image);

        const response = await axios.post('/api/blog', formData);

        if (response.data.success) {
            toast.success(response.data.message);
            setImage(false);
            setData({
                title: "",
                description: "",
                category: "Startup",
                author: "Alex",
                authorImg: "/profile_icon.png",
            })
        } else {
            toast.error("Error in adding new blog");
        }
    }

    if (!hasMounted) return null;


    return (
        <>
            <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
                <p className='text-xl'>Upload Thumbnail</p>
                <label htmlFor='image'>
                    {previewUrl || !image ? (
                        <Image
                            className='mt-4'
                            src={previewUrl || assets.upload_area}
                            alt='Preview'
                            width={140}
                            height={70}
                            layout="intrinsic"
                        />
                    ) : null}
                </label>
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' className='hidden' required />

                <p className='text-xl mt-4'>Blog Title</p>
                <input onChange={onChangeHandler} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Type here..' name="title" value={data.title} required />
                <p className='text-xl mt-4'>Blog Description</p>
                <textarea onChange={onChangeHandler} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' rows={6} type="text" placeholder='Write content here..' name="description" value={data.description} required />
                <p className='text-xl mt-4'>Blog Category</p>
                <select onChange={onChangeHandler} className='w-40 mt-4 px-4 py-3 border text-gray-500' name="category" value={data.category} >
                    <option value="Startup">Startup</option>
                    <option value="Technology">Technology</option>
                    <option value="Lifestyle">Lifestyle</option>
                </select>
                <br />
                <button type='submit' className='mt-8 w-40 h-12 bg-black text-white'>Add Blog</button>
            </form>
        </>
    )
}

export default page