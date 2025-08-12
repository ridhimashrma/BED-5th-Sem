const express=require("express")
const mongoose=require("mongoose")
const app=express()
const Users=require("./model/user")
app.use(express.urlencoded({extended:true}))
app.use(express.json())


//get single/specific user
app.get("/users/:id",async(req,res)=>{
    let id=req.params.id;
        let user=await Users.findById(id);
        res.json({
            success:true,
            message:"user fetched successfully",
            data:user
        })
})

//get all users
app.get("/users",async(req,res)=>{
let allUsers=await Users.find()
    res.json({
        success:true,
        message:"user added successfully",
        data:allUsers
    })
})

//add user
app.post("/users",async(req,res)=>{
    let name=req.body.name;
    let email=req.body.email;
    let password=req.body.password;
    let user={
        name:name,
        email:email,
        password:password,
        date:Date.now()
    }
    let newUser=new Users(user)
    await newUser.save()
    res.json({
        success:true,
        message:"User added successfully",
        data:newUser
    })

})


mongoose.connect('mongodb://127.0.0.1:27017/g27dB')
  .then(() => console.log('Connected!'));

app.listen(9999,()=>{
    console.log("server started")
})