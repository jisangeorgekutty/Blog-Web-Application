import { connectDB } from "@/lib/config/db";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises"
import BlogModel from "@/lib/models/blog.model";
import fs from 'fs'


const LoadDb = async () => {
    await connectDB();
}
LoadDb();

export async function GET(request) {

    const blogId = request.nextUrl.searchParams.get("id");

    if (blogId) {
        const blog = await BlogModel.findById(blogId);
        return NextResponse.json(blog)
    } else {
        const blogs = await BlogModel.find({});
        console.log(blogs)
        return NextResponse.json({ blogs });
    }


}

export async function POST(request) {
    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get('image');

    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path, buffer);

    const imageUrl = `/${timestamp}_${image.name}`

    const blogData = {
        title: `${formData.get("title")}`,
        description: `${formData.get("description")}`,
        category: `${formData.get("category")}`,
        author: `${formData.get("author")}`,
        image: `${imageUrl}`,
        authorImg: `${formData.get("authorImg")}`,
    }

    await BlogModel.create(blogData);
    console.log("blog saved")
    return NextResponse.json({ success: true, message: "Blog Added" });
}

export async function DELETE(request) {
    const id = await request.nextUrl.searchParams.get("id");
    const blog = await BlogModel.findById(id);
    fs.unlink(`./public${blog.image}`,()=>{});
    await BlogModel.findByIdAndDelete(id);

    return NextResponse.json({message:"Blog Deleted"});
}