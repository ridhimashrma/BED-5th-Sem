const express=require("express")
const mongoose=require("mongoose")
const jwt=require("jsonwebtoken") //token based authorization
const app=express()
const Users=require("./model/user")
let userRoutes=require("./routes/userRoutes")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/users",userRoutes)

function isLogin(req, res, next) {
    let token = req.headers.authorization;
    console.log("Token received:", token);

    if (!token) {
        return res.json({
            success: false,
            message: "Token not provided"
        });
    }

    try {
        let decode = jwt.verify(token, "hello");
        req.username = decode.username;
        return next();
    } catch (err) {
        return res.json({
            success: false,
            message: "Invalid token"
        });
    }
}


app.get("/home",isLogin,(req,res)=>{
    res.json({
        success:true,
        message:"server running"
    })
})

mongoose.connect('mongodb://127.0.0.1:27017/g27dB')
  .then(() => console.log('Connected!'));

app.listen(9908,()=>{
    console.log("server started")
})