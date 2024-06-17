const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
dotenv.config();
const chats = require('./data/data');
const ConnectDB = require('./config/db');
ConnectDB();
app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("API is running");
})

app.use('/api/user',userRoutes)
const PORT = process.env.PORT
app.listen(PORT,console.log("Server Started at Port ",PORT));