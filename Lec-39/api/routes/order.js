const express=require("express");
const { postPlaceOrder } = require("../controller/order");
const { verifyToken } = require("../middleware/auth");
const router=express.Router();

router.post("/",verifyToken,postPlaceOrder);

module.exports=router;