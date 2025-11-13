const express = require("express");
const router = express.Router();   

const { postPlaceOrder } = require("../controller/order");

router.get("/", (req, res) => {
    res.send("OrderBook is running");
});

router.post("/", postPlaceOrder);

module.exports = router;
