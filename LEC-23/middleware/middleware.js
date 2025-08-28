const jwt = require("jsonwebtoken");
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
module.exports.isLogin=isLogin;