class OrderBook{
    constructor(symbol){
        this.symbol=symbol;
        this.bids=[];
        this.ask=[];
        this.currentPrice=null;
        this.trades=[];
    }

    //if a function start with underscore (_) it makes it private doesnt maqke it private actually
     _sort(side){
        if(side=="BUY"){
            this.bids.sort((a,b)=>{
                //a-b ascending order
                //b-a descending order
                if(a.price!=b.price){
                   return  b.price-a.price
                }
                return a.timeStamp-b.timeStamp;
            }) //lexicographically by default in js
        }
        else {  //for SELL
        this.ask.sort((a, b) => {
            if (a.price !== b.price) {
                return a.price - b.price; // ascending by price
            }
            return a.timeStamp - b.timeStamp; // earlier first
        });
      }
    }


    placeOrder(price,quantity,type,side,userName){
        let newOrder={
            symbol:this.symbol,
            orderId: Math.floor(Math.random()*1000000),
            side:side,
            type:type,
            price:price||null,
            originalQty:quantity,
            executedQty:0,
            remainingQty:quantity,
            user:userName,
            timeStamp:Date.now(),
        }
        if(newOrder.type=="LIMIT"){
            let result=this._LimitMatch(newOrder)
            if(result.remainingQty>0){
                if(result.side=="BUY"){
                    this.bids.push(result)
                }else{
                    this.ask.push(result)
                }
                this._sort(result.side)
            }
        }else{
            let result=this._MarketMatch(newOrder)
        }
    }

    _LimitMatch(order){
        if(order.side=="BUY"){
            //115 buy 10 qty, sell 110,111,115
            let askArr=this.ask;
            while(order.remainingQty>=0 && askArr.length>0){
                let top=this.askArr[0];
                if(top.price<=order.price){
                    let buyQuantity=Math.min(top.quantity,order.quantity);
                    //update -->order
                    order.executedQty+=buyQuantity;
                    order.remainingQty-=buyQuantity;
                    //update top
                    top.executedQty+=buyQuantity;
                    top.remainingQty-=buyQuantity;

                    if(top.remainingQty==0){
                        askArr.shift();
                    }
                }
                else{
                    break;
                }
            }
            return order;
        }
        
        else if(order.side == "SELL") {
            let bidArr = this.bids;
            while(order.remainingQty > 0 && bidArr.length > 0) {
                let top = bidArr[0];
                if(top.price >= order.price) {
                    let sellQuantity = Math.min(order.quantity , top.quantity);
                    // update --> order
                    order.executedQty += sellQuantity;
                    order.remainingQty -= sellQuantity;
                    //update --> top
                    top.executedQty -= sellQuantity;
                    top.remainingQty -= sellQuantity;
                    if(top.remainingQty == 0) {
                        bidArr.shift();
                    }
                }
                else {
                    break;
                }
            }
            return order;
        }

        else{
            return "invalid order side"
        }
    }

    _MarketMatch(){

    }
}

let BTCUSDOrderBook=new OrderBook("BTC_USD");
// BTCUSDOrderBook.bids.push({price:"100",quantity:10,type:"LIMIT",user:"Samiya"})
// BTCUSDOrderBook.bids.push({price:"101",quantity:10,type:"LIMIT",user:"Sonam"})
// BTCUSDOrderBook.bids.push({price:"99",quantity:10,type:"LIMIT",user:"yuvika"})
// console.log(BTCUSDOrderBook);
// BTCUSDOrderBook._sort("BUY");
// console.log(BTCUSDOrderBook.bids);
// BTCUSDOrderBook.ask.push({price:"101",quantity:5,type:"LIMIT",user:"Samiya"})
// BTCUSDOrderBook.ask.push({price:"102",quantity:10,type:"LIMIT",user:"Samiya"})
// BTCUSDOrderBook.ask.push({price:"110",quantity:5,type:"LIMIT",user:"Samiya"})
// BTCUSDOrderBook._sort("SELL")
// console.log(BTCUSDOrderBook)

BTCUSDOrderBook.placeOrder("100",5,"LIMIT","BUY","Samiya");
BTCUSDOrderBook.placeOrder("101",10,"LIMIT","BUY","Samiya");
BTCUSDOrderBook.placeOrder("99",5,"LIMIT","BUY","Samiya");
console.log(BTCUSDOrderBook);
BTCUSDOrderBook.placeOrder("102",5,"LIMIT","SELL","Samiya");
BTCUSDOrderBook.placeOrder("103",5,"LIMIT","SELL","Samiya");
BTCUSDOrderBook.placeOrder("104",5,"LIMIT","SELL","Samiya");
console.log(BTCUSDOrderBook)


//if a function start with underscore (_) it means its private function and should not be used outside the class