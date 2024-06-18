const asynchandler = require('express-async-handler');
const Chat = require('../models/chatModel');
const User = require('../models/userModel');
const accessChat = asynchandler( async (req,res)=>{

    const { userId } = req.body;
    if(!userId){
        console.log("No User Params Id send");
      res.status(400);
        return ;
    } 
    var isChat  = await Chat.find({
        isGroupedChat : false,
       $and : [
        {users : { $elemMatch : {$eq : req.user._id} }},
        {users : {$elemMatch : {$eq : req.userId}}},
    
       ]
    }).populate('users',"-password").populate("latestMessage");
    isChat = await User.populate(isChat,{
        path : "latestMessage.sender",
        select : "name pic email",
    });
    if(isChat.length>0){
        res.send(isChat[0]);
    }
    else{
        try{
            var chatData = {
                chatName : "sender",
                isGroupedChat : false,
                users : [req.user._id,userId],
            };
            const createdChat = await Chat.create(chatData);

            const FullChat = await Chat.findOne({_id:createdChat._id}).populate("users","-password");
            res.status(200).json(FullChat);
        }catch(error){
           res.status(400);
           throw new Error(error.message);
        }
    }

})
module.exports = {accessChat};