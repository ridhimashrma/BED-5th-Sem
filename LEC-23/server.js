//1. create a login for user then token generation(with payload user id ) 
// and then in post / blogs add middleware isLogin,in this verify jwt token and modify req object like req.userId=decode.UserId

const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = express();

const Users = require("./model/user");
const Blog = require("./model/blog");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/g27dB')
    .then(() => console.log('Connected!'));

app.listen(9999, () => {
    console.log("Server started");
});
