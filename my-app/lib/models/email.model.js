import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({  
    email:{
        type:String,
        required:true
    },
    Date    :{
        type:Date,
        default:Date.now()
    }
})

const EmailModel=mongoose.models.email || mongoose.model('email',emailSchema);