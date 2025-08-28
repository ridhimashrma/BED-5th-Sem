const express=require("express")
const Blog=require("../model/blog.js")
const Users=require("../model/user.js")
const isLogin = require('../middleware/middleware.js');
let{postAddBlog,getAllBlogs,getOneBlog,deleteOneBlog}=require("../controllers/blogController.js")

const router=express.Router(); //small-->app

router.post("/",isLogin,postAddBlog)
router.delete("/:blogId", isLogin, deleteOneBlog);
router.get("/",getAllBlogs)
router.get("/:id",getOneBlog)

module.exports=router