const User = require("../Model/userModel");

exports.isAuthenticated = async (req, res, next) => {
  const userId = req.cookies.userId;
  if (!userId) {
    return res.redirect("/login.html");
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.redirect("/login.html");
    }
    req.user = user;
    next();
  } catch (err) {
    console.error("❌ Error in auth middleware:", err);
    res.status(500).send("Something went wrong");
  }
};

exports.isAdmin = async (req, res, next) => {
  const userId = req.cookies.userId;
  if (!userId) {
    return res.status(403).send("Forbidden: Please log in");
  }

  try {
    const user = await User.findById(userId);
    if (!user || user.role !== "admin") {
      return res.status(403).send("Forbidden: Admins only");
    }
    next();
  } catch (err) {
    console.error("❌ Error in admin middleware:", err);
    res.status(500).send("Something went wrong");
  }
};