const express = require("express");
const { login } = require("../controllers/authcontroller");
const Blog=require("../model/blog.js")
const Users=require("../model/user.js")
const isLogin = require('../middleware/middleware.js');

const router = express.Router();
router.post("/login", login);

module.exports = router;
