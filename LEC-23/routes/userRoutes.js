const express=require("express")
const Users=require("../model/user.js")
const Blog=require("../model/blog.js")
const isLogin = require('../middleware/middleware.js');

let{getAllUsers,getOneUser,postAddUser}=require("../controllers/userController.js")
const router=express.Router()
router.get("/:id",getOneUser)
router.get("/",getAllUsers)
router.post("/",postAddUser)

module.exports=router