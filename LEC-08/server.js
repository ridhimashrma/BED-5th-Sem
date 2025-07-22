const express = require("express");
const app = express();
// console.log(app);                    req and res are object. method of res all info of req
app.get("/",(req,res)=>{
    console.log(req);
    // res.send("hello world")// text
    // res.send("<h1> world</h1>")//HTML
    res.json({
        name:"upasana",
        address:"ambala",
        isLogin:true
    })
})
//path param/variable!
//1. params
app.get("/users/:id",(req,res)=>{
    console.log(req.params.id);
    let id = req.params.id;
    // res.send("ok")
    res.send(id)
})
//2.query parameter
app.get("/blogs",(req,res)=>{
    console.log(req.query.title);
    console.log(req.query.desc);
    res.send("gotttt");
})

app.listen(2223,()=>{
    console.log("server started");
})