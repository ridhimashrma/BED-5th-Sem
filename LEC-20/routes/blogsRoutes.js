const express=require("express")
const { isLogin } = require("../middleware/middleware")
const router=express.Router()
router.use(isLogin)
router.get("/",(req,res)=>{
    res.json({
        success:true,
        message:"all blogs data fetches"
    })
})
router.get("/:id",(req,res)=>{
    res.json({
        success:true,
        message:"one blogs data"
    })
})
router.post("/",(req,res)=>{
    res.json({
        success:true,
        message:" blog data added"
    })
})


module.exports=router