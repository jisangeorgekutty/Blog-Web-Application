import { connectDB } from "@/lib/config/db";
import { NextResponse } from "next/server";
import {writeFile} from "fs/promises"
import BlogModel from "@/lib/models/blog.model";


const LoadDb = async () => {
    await connectDB();
}
LoadDb();

export async function GET(request) {
    console.log("BLOG GET");
    return NextResponse.json({ message: "API Working" });
}

export async function POST(request) {
    const formData=await request.formData();
    const timestamp=Date.now();

    const image=formData.get('image');

    const imageByteData=await image.arrayBuffer();
    const buffer=Buffer.from(imageByteData);
    const path= `./public/${timestamp}_${image.name}`;
    await writeFile(path,buffer);

    const imageUrl=`/${timestamp}_${image.name}`

    const blogData={
        title:`${formData.get("title")}`,
        description:`${formData.get("description")}`,
        category:`${formData.get("category")}`,
        author:`${formData.get("author")}`,
        image:`${imageUrl}`,
        authorImg:`${formData.get("authorImg")}`,
    }

    await BlogModel.create(blogData);
    console.log("blog saved")
    return NextResponse.json({success:true,message:"Blog Added"});
}