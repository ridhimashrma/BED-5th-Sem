const express = require("express");
const router = express.Router();
const orderController = require("../Controller/orderController");
const auth = require("../Middleware/auth");

router.get("/", orderController.getHome);
router.get("/menu", orderController.getMenu);
router.post("/cart/add", auth.isAuthenticated, orderController.addToCart);
router.get("/cart", auth.isAuthenticated, orderController.getCart);
router.post("/cart/remove", auth.isAuthenticated, orderController.removeFromCart);
router.get("/order-form", auth.isAuthenticated, orderController.getOrderForm);
router.post("/place-order", auth.isAuthenticated, orderController.placeOrder);
router.get("/view-orders", auth.isAuthenticated, orderController.viewOrders);
router.post("/delete-order", auth.isAuthenticated, orderController.deleteOrder);
router.get("/update-order/:orderId", auth.isAuthenticated, orderController.getUpdateOrder);
router.post("/update-order/:orderId", auth.isAuthenticated, orderController.updateOrder);

module.exports = router;