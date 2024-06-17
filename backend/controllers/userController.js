const asynchandler =  require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');

const registerUser = async (req,res)=>{
  
    
   const {name,email,password,pic} = req.body;
   if(!name || !email || !password){
     res.status(400);
      throw new Error("Please Enter all the Fields");
   }
   const userExits = await User.findOne({email});
   if(userExits){
    res.status(400);
    throw new Error("User Already Exist");
   }
   const user = await User.create({
    name,
    password,
    email,
    pic,
});
if(user){
    res.status(201).json({
        _id : user._id,
        name : user.name,
        email : user.email,
        pic : user.pic,
        token : generateToken(user._id),
    });
}
else{
    res.status(400);
    throw new Error('Failed To Create New User');
}
}
module.exports = {registerUser};