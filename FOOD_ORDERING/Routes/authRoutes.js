const express = require("express");
const router = express.Router();
const authController = require("../Controller/authController");

router.get("/check-auth", authController.checkAuth);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/register.html", (req, res) => res.sendFile("register.html", { root: "./Public" }));
router.get("/login.html", (req, res) => res.sendFile("login.html", { root: "./Public" }));

module.exports = router;