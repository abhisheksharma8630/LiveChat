import express from 'express';
import { Server } from 'socket.io';
import {createServer} from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import {connectDB} from './utils/features.js'
import dotenv from 'dotenv';
dotenv.config();
import {User} from './models/user.js';


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// connectDB(process.env.MONGO_URL).then(()=>{console.log("connection is successfull")}).catch(err=>{console.log(err)});


const server = createServer(app);

const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true
    }
});

app.use(cors({
    origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true
}))

let connectedUser = [];

io.on("connection",(socket)=>{
    console.log("Client connected");
    console.log("Socket Id",socket.id);
    connectedUser = [...connectedUser,socket.id];

    io.emit('updateUserList',connectedUser)
    
    socket.emit("welcome","Welcome to the server");
    
    socket.broadcast.emit("welcome2",`User Joined ${socket.id}`);
    
    socket.on("message",({message,room})=>{
        io.to(room).emit("receive-message",message);
        console.log({message,room});

        // socket.broadcast.emit("receive-message",msg)

        // console.log(socket.id," Message: ",msg);
    })

    socket.on("disconnect",()=>{
        connectedUser = connectedUser.filter((e)=> e != socket.id);
        console.log(connectedUser);
        io.emit('updateUserList',connectedUser);
        console.log("User Disconnected ",socket.id);
    })
})

server.listen(8080,()=>{
    console.log("App is listening at port 8080");
})

app.get("/",(req,res)=>{
    res.send("hello ji");
})

app.post("/new",async (req,res)=>{
    const {name,username,password} = req.body;
    const createdUser = await User.create({name:name,username:username,password:password});
    res.status(201).send(createdUser);
})