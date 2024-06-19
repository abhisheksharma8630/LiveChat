import mongoose from "mongoose"

const connectDB = async (url)=>{
    await mongoose.connect(url);
}

const sendToken = (req,user,code,message)=>{
    
}

export {connectDB, sendToken};