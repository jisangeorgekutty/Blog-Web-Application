import { connectDB } from "@/lib/config/db";
import { NextResponse } from "next/server";
import {writeFile} from "fs/promises"
import { Coming_Soon } from "next/font/google";

const LoadDb = async () => {
    await connectDB();
}

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

    console.log(imageUrl);
    return NextResponse.json({imageUrl});


}