const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');


dotenv.config();
const chats = require('./data/data');
const ConnectDB = require('./config/db');
ConnectDB();
app.use(cors());
app.get('/',(req,res)=>{
    res.send("API is running");
})

app.get('/api/chat',(req,res)=>{

    res.send(chats);
})

app.get('/api/chat/:id',(req,res)=>{
    const singleChat = chats.find((c)=> c._id==req.params.id);
    res.send(singleChat);
})
const PORT = process.env.PORT
app.listen(PORT,console.log("Server Started at Port ",PORT));