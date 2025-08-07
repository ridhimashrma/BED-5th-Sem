const express=require("express")
const app=express()
const path=require("path")
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname+"/public")))
app.post('/login',(req,res)=>{
    let email=req.body.email
    let password=req.body.password
    let newUser={
        email,
        password
    }
    console.log(email,password)
    //res.send("user added")
    try{
        res.json({
            success:true,
            data:newUser,
            message:"User added successfully"
        })
    }
    catch(error){
        res.json({
            success:false,
            message:"User not added"
        })
    }
})

app.listen(7880,()=>{
    console.log("server started")
})

