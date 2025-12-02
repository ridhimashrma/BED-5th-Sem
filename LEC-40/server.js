const express=require('express')
const app=express()
const User=require('./model/userSchema')
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.post("/api/users/register",async (req,res)=>{
    const {name,email,password}=req.body
    const userExists=await User.findOne({email})
    if(userExists){
        return res.json({
            success:true,
            message:"User already exists"
        })
    }
   let newUser=await User.create({
        name:name,
        email:email,
        password:password
   })
   res.json({
        success:true,
        message:"User registered successfully!!!!",
        data:newUser
   })
})


module.exports=app