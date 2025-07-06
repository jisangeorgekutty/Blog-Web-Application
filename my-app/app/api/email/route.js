import { connectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/email.model";
import { NextResponse } from "next/server";

const LoadDb=async()=>{
    await connectDB();
}

LoadDb();


export async function POST(request) {
    const formData=await request.formData();
    const emailData={
        email:`${formData.get("email")}`,
    }

    await EmailModel.create(emailData);
    return NextResponse.json({message:"Email Subscribed",success:true})
}

export async function GET(request) {
    const emails=await EmailModel.find({});
    return NextResponse.json({emails});
}