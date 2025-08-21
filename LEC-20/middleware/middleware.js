function m1(req,res,next){
    console.log("running middleware 1..")
   req.user={
    id:1,
    username:"Ridhima"
   } 
   return next()
}
function m2(req,res,next){
    console.log("running middleware2")
    console.log(req.user);
    req.isAdmin=true
    return next()
}
function checkAdmin(req,res,next){
    console.log("running checkAdmin middleware")
    let {name}=req.query;
    if(name=="Ridhima"){
        req.isAdmin=true;
        return next()
    }
    res.json({
        success:false,
        message:"you are not the admin"
    })
    return next()
}
function isLogin(req,res,next){
    console.log("running middleware isLogin")
    return next()
}
module.exports.m1=m1;
module.exports.m2=m2;
module.exports.checkAdmin=checkAdmin;
module.exports.isLogin=isLogin;