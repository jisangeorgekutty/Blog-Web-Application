import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://jisangeorge123:OvZMt0otIQY5ZmLu@cluster0.xdxz8sv.mongodb.net/blogapp');
        console.log(`MongoDB Connection Successfull ${conn.connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection Error:", error)
    }
}