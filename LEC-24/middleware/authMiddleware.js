const jwt = require("jsonwebtoken");

function isLogin(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.json({ success: false, message: "No token provided" });
  }

  try {
    const decode = jwt.verify(token, "okk");
    req.userId = decode.userId;
    next();
  } catch (err) {
    return res.json({ success: false, message: "Invalid token" });
  }
}

module.exports = isLogin;