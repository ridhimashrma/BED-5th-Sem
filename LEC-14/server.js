const express=require("express")
const app=express()
const fs=require("fs")
const path=require("path")
app.use(express.static(path.join(__dirname, "public")));

app.get("/users",(req,res)=>{
    fs.readFile("./users.json","utf-8",function(err,data){
        if(err) return res.send(err)
        let users=JSON.parse(data)
        return res.json(users)
    })
})

app.listen(7880,()=>{
    console.log("server started")
})

