const express=require("express")
const mongoose =require("mongoose")
const app=express()
const Blog=require("./model/blog")
app.use(express.urlencoded({extended:true}))
app.use(express.json())
//create -> add
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

//read
//read all data
//read selective data

app.get("/blogs",async(req,res)=>{
    let allBlogs=await Blog.find()
    res.json({
        success:true,
        message:"data added successfully",
        data:allBlogs
    })
})

app.get("/blogs/:id",async(req,res)=>{
    let id=req.params.id;
    let blog=await Blog.findById(id);
    res.json({
        success:true,
        message:"blog fetched successfully",
        data:blog
    })
})


mongoose.connect('mongodb://127.0.0.1:27017/g27dB')
  .then(() => console.log('Connected!'));
app.listen(7889,()=>{
    console.log("server started")
})