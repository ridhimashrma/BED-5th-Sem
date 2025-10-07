const User=rwquire("../service/userService")
Module.exports.postUser=async(req,res)=>{
    let{email,name}=req.body
    let message = await User.addUser(email,name)
    res.json({
        success:true,
        message:message
    })
}