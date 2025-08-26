//1. create a login for user then token generation(with payload user id ) 
// and then in post / blogs add middleware isLogin,in this verify jwt token and modify req object like req.userId=decode.UserId

const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = express();

const Users = require("./model/user");
const Blog = require("./model/blog");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function isLogin(req, res, next) {
    let token = req.headers.authorization;
    if (!token) {
        return res.json({
            success: false,
            message: "Token not provided"
        });
    }
    let decode = jwt.verify(token,"hello");
    if(!decode){
        return res.json({ 
            success: false,
            message: "Invalid token" 
        });
    }
    req.userId = decode.userId;
    next();
        
}

app.post("/login", async (req, res) => {
    let { email, password } = req.body;

    let user = await Users.findOne({ email: email });
    if (!user) {
        return res.json({ 
            success: false, 
            message: "User not found"
        });
    }
    if (user.password !== password) {
        return res.json({ 
            success: false, 
            message: "Incorrect Password"
        });
    }
    let token = jwt.sign({ "userId": user._id },"hello");

    res.json({
        success: true,
        message: "Login successful",
        token: token
    });
});

app.post('/blogs', isLogin, async (req, res) => {
    let { title, body } = req.body;
    let userId = req.userId; 

    let user = await Users.findById(userId);
    if (!user) {
        return res.json({
            success: false,
            message: "Invalid user"
        });
    }

    let blog = {
        title: title,
        body: body,
        date: Date.now(),
        userId: userId
    };

    let newBlog = new Blog(blog);
    await newBlog.save();

    user.blogs.push(newBlog._id);
    await user.save();

    res.json({
        success: true,
        message: "Blog added successfully",
        data: newBlog
    });
});

app.delete("/blogs/:blogId/:userId", async (req, res) => {
    let blogId = req.params.blogId;
    let userId = req.params.userId;

    let blogExist = await Blog.findById(blogId);
    if (!blogExist) {
        return res.json({
            success: false,
            message: "Blog does not exist"
        });
    }

    if (blogExist.userId != userId) {
        return res.json({
            success: false,
            message: "Permission denied"
        });
    }

    await Blog.findByIdAndDelete(blogId);
    res.json({
        success: true,
        message: "Blog deleted successfully"
    });
});

app.get("/blogs", async (req, res) => {
    let allBlogs = await Blog.find();
    res.json({
        success: true,
        message: "Blogs fetched successfully",
        data: allBlogs
    });
});

app.get("/blogs/:id", async (req, res) => {
    let id = req.params.id;
    let blog = await Blog.findById(id);
    res.json({
        success: true,
        message: "Blog fetched successfully",
        data: blog
    });
});

app.get("/users/:id", async (req, res) => {
    let id = req.params.id;
    let user = await Users.findById(id);
    res.json({
        success: true,
        message: "User fetched successfully",
        data: user
    });
});

app.get("/users", async (req, res) => {
    let allUsers = await Users.find();
    res.json({
        success: true,
        message: "Users fetched successfully",
        data: allUsers
    });
});

app.post("/users", async (req, res) => {
    let { name, email, password } = req.body;

    let user = { name, email, password };
    let newUser = new Users(user);
    await newUser.save();

    res.json({
        success: true,
        message: "User added successfully",
        data: newUser
    });
});

mongoose.connect('mongodb://127.0.0.1:27017/g27dB')
    .then(() => console.log('Connected!'));

app.listen(9999, () => {
    console.log("Server started");
});
