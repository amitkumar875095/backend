const asynchandler =  require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');
const expressAsyncHandler = require('express-async-handler');

module.exports.registerUser = asynchandler(async (req,res)=>{
  
    console.log("User");
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
})



//login
module.exports.authUser =  asynchandler(async(req,res)=>{
   
 const {email,password} = req.body;
 const user = await User.findOne({email});
 if(user&& (await user.matchPassword(password))){
  return  res.status(200).json({
        _id : user._id,
        name : user.name,
        email : user.email,
        pic : user.pic,
        token : generateToken(user._id),
    })
 }
 else{
    res.status(401);
    throw new Error("Invalid Email or Password");
 }

})

// api/user?search=amit
module.exports.allUsers = asynchandler( async (req,res)=>{
    const keyword = req.query.search?{
   $or :[
    {name : {$regex : req.query.search,$options : "i"}},
    {email : {$regex : req.query.search,$options : "i"}},
   ]
    }:{};
    
 const users =await User.find(keyword).find({_id:{$ne : req.user._id}})
 res.send(users);

});