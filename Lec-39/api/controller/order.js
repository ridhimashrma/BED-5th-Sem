const OrderBook = require("../service/orderbook");
let { publisher } = require("../../shared/index.js");

module.exports.postPlaceOrder = async (req, res) => {
    let { price, quantity, type, side } = req.body;
    let username = req.user.username;  // get from decoded token

    // basic validation
    if (!quantity || !type || !side) {
        return res.json({ message: "Missing required fields" });
    }

    // NOTE: No symbol needed
    let response = OrderBook.placeOrder(price, quantity, type, side, username);

    await publisher.PUBLISH("book:update", JSON.stringify(response.book));

    res.json(response);
};
