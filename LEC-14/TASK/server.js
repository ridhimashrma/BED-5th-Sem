const express=require("express")
const app=express()
const fs=require("fs")
const path=require("path")
app.use(express.static(path.join(__dirname, "public")));

app.get("/todos",(req,res)=>{
    fs.readFile("./todos.json","utf-8",function(err,data){
        if(err) return res.send(err)
        let todos=JSON.parse(data)
        return res.json(todos)
    })
})

app.listen(8880,()=>{
    console.log("server started")
})
