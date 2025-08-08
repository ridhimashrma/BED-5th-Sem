const express=require("express")
const app=express()
const path=require("path")

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname+"/public")))

app.post("/user",(req,res)=>{
    const {email,password}=req.body
    console.log(email,password)
    try {
        res.json({
        success:true,
        message:"user added successfully",
        data:{
            email,
            password
        }
        })
    }
    catch(err){
        res.json({
            success:false,
            message:"user not added",
        })
    }
})
app.listen(7890,()=>{
    console.log("Server started")
})



//frontend, take data from input and store it into the file.2