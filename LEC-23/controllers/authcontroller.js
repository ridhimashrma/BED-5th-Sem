const jwt = require("jsonwebtoken");
const Blog=require("../model/blog.js")
const Users=require("../model/user.js")

module.exports.login= async (req, res) => {
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
}