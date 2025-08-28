const Blog=require("../model/blog.js")
const Users=require("../model/user.js")

module.exports.getAllUsers= async (req, res) => {
    let allUsers = await Users.find();
    res.json({
        success: true,
        message: "Users fetched successfully",
        data: allUsers
    });
}

module.exports.getOneUser= async (req, res) => {
    let id = req.params.id;
    let user = await Users.findById(id);
    res.json({
        success: true,
        message: "User fetched successfully",
        data: user
    });
}

module.exports.postAddUser= async (req, res) => {
    let { name, email, password } = req.body;

    let user = { name, email, password };
    let newUser = new Users(user);
    await newUser.save();

    res.json({
        success: true,
        message: "User added successfully",
        data: newUser
    });
}