const exp = require("constants")
const express=require("express")
const mongoose =require("mongoose")
const app=express()
const Blog=require("./model/blog")
app.use(express.urlencoded({extended:true}))
app.use(express.json())
//create
app.post('/blogs',async(req,res)=>{
    let title=req.body.title;
    let body=req.body.body;
    let blog={
        title:title,
        body:body,
        date:Date.now()
    }
    let newBlog=new Blog(blog)
    await newBlog.save()
    res.json({
        success:true,
        message:"blog added successfully",
        data:newBlog
    })
})



mongoose.connect('mongodb://127.0.0.1:27017/g27dB')
  .then(() => console.log('Connected!'));
app.listen(7889,()=>{
    console.log("server started")
})