const express = require("express");
const { createBlog, deleteBlog, getAllBlogs, getBlogById } = require("../controller/blogController");
const isLogin = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", isLogin, createBlog);
router.delete("/:blogId", isLogin, deleteBlog);
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

module.exports = router;