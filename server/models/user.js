import {Schema, model} from 'mongoose';

const schema = new Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false,
    }
});

export const User = model("User",schema);