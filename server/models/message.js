import {Schema, Schema, model} from 'mongoose';

const schema = new Schema({

    content:String,
    sender:{
        type:Types.ObjectId,
        ref:"User",
        required:true
    },
},{
    timestamps:true
});

export const Message = model("Message",schema);