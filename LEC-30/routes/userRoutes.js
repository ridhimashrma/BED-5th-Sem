const express=require("express")
const router=express.Router(); 
router.post("/addUser",addUser)
router.get("/getUser",getUser)
module.exports=router;