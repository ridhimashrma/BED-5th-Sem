const express=require('express');
const app=express();
const User = require('./model/user.model');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post("/api/users/register",async(req,res)=>{
    const {name,email,password}=req.body;
    const userExist=await User.findOne({email});
    if(userExist){
        return res.json({
        success:false,
        message:"User already exists"
    });
   
    }
    let newUser = await User.create({
        name,
        email,
        password
    });
    res.json({
        success:true,
        message:"User registered successfully",
        data:newUser
    });  


})
module.exports=app;

// app.listen(4444,()=>{
//     console.log('Server is running on port 4444');
// });