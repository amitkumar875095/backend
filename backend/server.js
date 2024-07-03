const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
dotenv.config();
const chats = require('./data/data');
const ConnectDB = require('./config/db');
const {notFound,errorHandler} = require('./middleware/errorMiddleware');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');


ConnectDB();
app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("API is running");
})

app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT
const server = app.listen(PORT,console.log("Server Started at Port ",PORT));

const io = require('socket.io')(server,{
    pingTimeout : 60000,
    cors : {
        origin : "http://localhost3000",
    },
});
io.on("connection",(socket)=>{
    console.log("connected to socket io")
});