const Users=require("../model/user.js")
const jwt=require("jsonwebtoken")

module.exports.getUserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email: email });
        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }
        if (user.password !== password) {
            return res.json({
                success: false,
                message: "Invalid password"
            });
        }
        if(user){
            let token=jwt.sign({"user":user},"hello")
           return res.json({
                success: true,
                message: "Login successful",
                token:token,
                data: user
            });
        }
        

    } catch (error) {
        res.json({
            success: false,
            message: "error",
            error: error.message
        });
    }
};
module.exports.postAddUser = async (req, res) => {
    try {
        console.log(req.body)
        let name=req.body.name;
        let email=req.body.email;
        let password=req.body.password;

        if (!name || !email || !password) {
            return res.json({
                success: false,
                message: "All fields are required"
            });
        }

        const existingUser = await Users.findOne({ email: email });
        if (existingUser) {
            return res.json({
                success: false,
                message: "User already exists"
            });
        }

        const newUser = new Users({ name, email, password });
        await newUser.save();

        res.json({
            success: true,
            message: "User registered successfully",
            data: newUser
        });

    } catch (error) {
        res.json({
            success: false,
            message: "error",
            error: error.message
        });
    }
};
