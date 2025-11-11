const OrderBook = require('../service/orderbook');
let {publisher}=require("../../shared/index")
const ob=new OrderBook("BTC_USD");
module.exports.postPlaceOrder = async(req , res)=>{
    //user,quantity,type,price,side,symbol
    let {user,quantity,type,price,side,symbol}=req.body;
    //basic validation 
    if(!user || !quantity || !type || !side || !symbol){
        return res.json({
            success:false,
            message:"All fields are required"
        });
    }
    let response=ob.placeOrder(price,quantity,type,side,user);
    await publisher.connect();
    await publisher.publish('book:update',JSON.stringify(response.book))
    console.log(response);  
    return res.json({
        success:true,
        data:response
    });
}