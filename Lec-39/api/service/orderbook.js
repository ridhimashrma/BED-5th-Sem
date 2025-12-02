// class OrderBook {
//     static orderBookManager=new Map();
//     //"symbol":"object of type orderbook "
//     constructor(symbol) {
//         this.symbol = symbol;
//         this.bids = [];
//         this.ask = [];
//         this.currentPrice = null;
//         this.trades = [];
//     }

//     static getOrderBook(symbol){    //singleton pattern with multiple markets
//         if(!orderBookManager.get(symbol)){
//             let orderbook=new orderbook(symbol);
//             orderBookManager.set(symbol,orderbook);
//         }
//         return orderbook.orderBookManager.get(symbol);
//     }
//     // {
//     //     userId:
//     //     price:
//     //     quantity:
//     //     timestamp:
//     // }


//     // if a function is prefixed with _ , it means its a private function (it doesnot make it private, there is no such thing it is just a convention)
//     _sort(side) {
//         if (side == "BUY") {
//             // this.bids.sort();   // lexicographical order by default
//             this.bids.sort((a, b) => {
//                 if (a.price != b.price) {
//                     return b.price - a.price;   // descending order of price
//                 }
//                 return a.timestamp - b.timestamp;  // ascending order of timestamp
//             });
//         }
//         if (side == "SELL") {
//             this.ask.sort((a, b) => {
//                 if (a.price != b.price) {
//                     return a.price - b.price;
//                 }
//                 return a.timestamp - b.timestamp;
//             })
//         }
//     }


//     placeOrder(price, quantity, type, side, userName,symbol) {
//         let newOrder = {
//             symbol: this.symbol,
//             orderId: Math.floor(Math.random() * 1000000),
//             side: side,
//             type: type,
//             price: price || null,
//             originalQty: quantity,
//             executedQty: 0,
//             remainingQty: quantity,
//             user: userName,
//             timestamp: Date.now()
//         }
//         let trades = [];
//         if (newOrder.type == "LIMIT") {
//             let [order, trade] = this._LimitMatch(newOrder,trades);
//             if(trade) {
//                 this.trades = [...this.trades,...trade];
//             }
//             if (order.remainingQty > 0) {
//                 if (order.side == "BUY") {
//                     this.bids.push(order);
//                 } else {
//                     this.ask.push(order)
//                 }
//                 this._sort(order.side);
//             }
//             return {book : this.getBookSnapshot(), trade : this.getLatestTrade(), order};
//         } 
//         else {
//             let [order, trade] = this._MarketMatch(newOrder, trades);
//             if(trade) {
//                 this.trades = [...this.trades,...trade];
//             }
//             if(order.remainingQty > 0) {
//                 console.log("order completed : "+order.executedQty+" , order cancel : "+order.remainingQty);
//             } else {
//                 console.log("order completed : "+order.executedQty);
//             }
//             return {book : this.getBookSnapshot(), trade : this.getLatestTrade(), order}
//         }
//     }

//     _LimitMatch(order,trade) {
//         if (order.side == "BUY") {
//             let askArr = this.ask;
//             while (order.remainingQty > 0 && askArr.length > 0) {
//                 let top = askArr[0];
//                 if (top.price <= order.price) {
//                     let buyQuantity = Math.min(order.remainingQty, top.remainingQty);
//                     this.currentPrice = top.price;
//                     trade.push([buyQuantity,top.price]);
//                     // update --> order 
//                     order.executedQty += buyQuantity;
//                     order.remainingQty -= buyQuantity;
//                     //update --> top
//                     top.executedQty += buyQuantity;
//                     top.remainingQty -= buyQuantity;

//                     if (top.remainingQty == 0) {
//                         askArr.shift();
//                     }
//                 }
//                 else {
//                     break;
//                 }
//             }
//             return [order,trade];
//         }
//         else if (order.side == "SELL") {
//             let bidArr = this.bids;
//             while (order.remainingQty > 0 && bidArr.length > 0) {
//                 let top = bidArr[0];
//                 if (top.price >= order.price) {
//                     let sellQuantity = Math.min(order.remainingQty, top.remainingQty);
//                     this.currentPrice = top.price;
//                     trade.push([sellQuantity,top.price]);
//                     // update --> order
//                     order.executedQty += sellQuantity;
//                     order.remainingQty -= sellQuantity;
//                     //update --> top
//                     top.executedQty += sellQuantity;
//                     top.remainingQty -= sellQuantity;
//                     if (top.remainingQty == 0) {
//                         bidArr.shift();
//                     }
//                 }
//                 else {
//                     break;
//                 }
//             }
//             return [order, trade];
//         }
//         else {
//             return "Invalid order side";
//         }
//     }

//     _MarketMatch(order,trade) {
//         // if it is buy, start buying from the start of ask array (best price)
//         if (order.side == "BUY") {
//             let askArr = this.ask;
//             while (order.remainingQty > 0 && askArr.length > 0) {
//                 let top = askArr[0];
//                 let buyQuantity = Math.min(order.remainingQty, top.remainingQty);
//                 this.currentPrice = top.price;
//                     trade.push([buyQuantity,top.price]);
//                 // update --> order
//                 order.executedQty += buyQuantity;
//                 order.remainingQty -= buyQuantity;
//                 // update --> top
//                 top.executedQty += buyQuantity;
//                 top.remainingQty -= buyQuantity;

//                 // remove fully filled SELL order
//                 if (top.remainingQty == 0) {
//                     askArr.shift();
//                 }
//             }
//             return [order, trade];
//         }

//         else if (order.side == "SELL") {
//             let bidArr = this.bids;
//             while (order.remainingQty > 0 && bidArr.length > 0) {
//                 let top = bidArr[0]; 
//                 let sellQuantity = Math.min(order.remainingQty, top.remainingQty);
//                 this.currentPrice = top.price;
//                     trade.push([sellQuantity,top.price]);
//                 // update --> order
//                 order.executedQty += sellQuantity;
//                 order.remainingQty -= sellQuantity;
//                 // update --> top
//                 top.executedQty += sellQuantity;
//                 top.remainingQty -= sellQuantity;

//                 if (top.remainingQty == 0) {
//                     bidArr.shift();
//                 }
//             }
//             return [order, trade];
//         }

//         else {
//             return "Invalid order side";
//         }
//     }

//     getPrice() {
//         return this.currentPrice;
//     }

//     getBookSnapshot() {
//         return {
//             "ask" : this.ask.map((a) => [a.price, a.remainingQty]),
//             "bids" : this.bids.map((b) => [b.price, b.remainingQty])
//         }
//     }

//     getLatestTrade() {
//         return this.trades;
//     }
// }

// let BTCUSDOrderBook = new OrderBook("BTC_USD");
// // BTCUSDOrderBook.bids.push({price:"100" , quantity:10 , type:"LIMIT" , user:"Yuvika"});
// // BTCUSDOrderBook.bids.push({price:"101" , quantity:10 , type:"LIMIT" , user:"Upasana"});
// // BTCUSDOrderBook.bids.push({price:"99" , quantity:10 , type:"LIMIT" , user:"Samiya"});

// // console.log(BTCUSDOrderBook);
// // BTCUSDOrderBook._sort("BUY");

// // BTCUSDOrderBook.ask.push({price:"101" , quantity:5 , type:"LIMIT" , user:"Yuvika"});
// // BTCUSDOrderBook.ask.push({price:"102" , quantity:10 , type:"LIMIT" , user:"Upasana"});
// // BTCUSDOrderBook.ask.push({price:"110" , quantity:10 , type:"LIMIT" , user:"Yuvika"});

// // BTCUSDOrderBook._sort("SELL");
// // console.log(BTCUSDOrderBook);


// BTCUSDOrderBook.placeOrder("100", 5, "LIMIT", "BUY", "Samiya");
// BTCUSDOrderBook.placeOrder("101", 10, "LIMIT", "BUY", "Samiya");
// BTCUSDOrderBook.placeOrder("99", 5, "LIMIT", "BUY", "Samiya");
// // console.log(BTCUSDOrderBook)
// BTCUSDOrderBook.placeOrder("102", 5, "LIMIT", "SELL", "Samiya");
// BTCUSDOrderBook.placeOrder("103", 5, "LIMIT", "SELL", "Samiya");
// BTCUSDOrderBook.placeOrder("104", 5, "LIMIT", "SELL", "Samiya");
// BTCUSDOrderBook.placeOrder("101", 3, "LIMIT", "SELL", "Samiya");
// // console.log(BTCUSDOrderBook)
// console.log(BTCUSDOrderBook.getPrice())
// BTCUSDOrderBook.placeOrder(null, 10, "MARKET", "BUY", "Samiya");
// console.log(BTCUSDOrderBook.getPrice())
// // console.log(BTCUSDOrderBook)
// console.log(BTCUSDOrderBook.getBookSnapshot())
// console.log(BTCUSDOrderBook.getLatestTrade())


// module.exports = OrderBook;



// //make user sign up login regsiteration only for signed in people jwt

// //project
// //cacging
// //webssokcte
// //pubsub
// //message queue
// //microservice architecture



// api/service/orderbook.js
class OrderBook {
  constructor(symbol = "GLOBAL") {
    this.symbol = symbol;
    this.bids = []; // BUY orders (sorted desc by price, then asc by time)
    this.ask = [];  // SELL orders (sorted asc by price, then asc by time)
    this.currentPrice = null;
    this.trades = []; // array of trade objects { qty, price, timestamp }
  }

  // private-ish sorter
  _sort(side) {
    if (side === "BUY") {
      this.bids.sort((a, b) => {
        if (a.price !== b.price) return b.price - a.price;
        return a.timestamp - b.timestamp;
      });
    } else if (side === "SELL") {
      this.ask.sort((a, b) => {
        if (a.price !== b.price) return a.price - b.price;
        return a.timestamp - b.timestamp;
      });
    }
  }

  // placeOrder: price may be null for MARKET
  placeOrder(price, quantity, type, side, userName) {
    // normalize inputs
    const normalizedPrice = price !== null && price !== undefined ? Number(price) : null;
    const normalizedQty = Number(quantity);

    const newOrder = {
      symbol: this.symbol,
      orderId: Math.floor(Math.random() * 1_000_000),
      side,
      type,
      price: normalizedPrice,
      originalQty: normalizedQty,
      executedQty: 0,
      remainingQty: normalizedQty,
      user: userName,
      timestamp: Date.now()
    };

    let trades = [];

    if (newOrder.type === "LIMIT") {
      const [order, trade] = this._limitMatch(newOrder);
      if (trade.length) this.trades.push(...trade);

      if (order.remainingQty > 0) {
        if (order.side === "BUY") this.bids.push(order);
        else this.ask.push(order);
        this._sort(order.side);
      }

      return {
        book: this.getBookSnapshot(),
        trade: trade,
        order
      };
    } else if (newOrder.type === "MARKET") {
      const [order, trade] = this._marketMatch(newOrder);
      if (trade.length) this.trades.push(...trade);

      return {
        book: this.getBookSnapshot(),
        trade: trade,
        order
      };
    } else {
      throw new Error("Unknown order type: " + type);
    }
  }

  _limitMatch(order) {
    const trades = [];

    if (order.side === "BUY") {
      const askArr = this.ask;
      while (order.remainingQty > 0 && askArr.length > 0) {
        const top = askArr[0];
        if (top.price <= order.price) {
          const qty = Math.min(order.remainingQty, top.remainingQty);
          this.currentPrice = top.price;

          // record trade
          trades.push({ qty, price: top.price, timestamp: Date.now() });

          // update both orders
          order.executedQty += qty;
          order.remainingQty -= qty;

          top.executedQty += qty;
          top.remainingQty -= qty;

          if (top.remainingQty === 0) askArr.shift();
        } else break;
      }
      return [order, trades];
    } else if (order.side === "SELL") {
      const bidArr = this.bids;
      while (order.remainingQty > 0 && bidArr.length > 0) {
        const top = bidArr[0];
        if (top.price >= order.price) {
          const qty = Math.min(order.remainingQty, top.remainingQty);
          this.currentPrice = top.price;

          trades.push({ qty, price: top.price, timestamp: Date.now() });

          order.executedQty += qty;
          order.remainingQty -= qty;

          top.executedQty += qty;
          top.remainingQty -= qty;

          if (top.remainingQty === 0) bidArr.shift();
        } else break;
      }
      return [order, trades];
    } else {
      return [order, trades];
    }
  }

  _marketMatch(order) {
    const trades = [];
    if (order.side === "BUY") {
      const askArr = this.ask;
      while (order.remainingQty > 0 && askArr.length > 0) {
        const top = askArr[0];
        const qty = Math.min(order.remainingQty, top.remainingQty);
        this.currentPrice = top.price;

        trades.push({ qty, price: top.price, timestamp: Date.now() });

        order.executedQty += qty;
        order.remainingQty -= qty;

        top.executedQty += qty;
        top.remainingQty -= qty;

        if (top.remainingQty === 0) askArr.shift();
      }
      return [order, trades];
    } else if (order.side === "SELL") {
      const bidArr = this.bids;
      while (order.remainingQty > 0 && bidArr.length > 0) {
        const top = bidArr[0];
        const qty = Math.min(order.remainingQty, top.remainingQty);
        this.currentPrice = top.price;

        trades.push({ qty, price: top.price, timestamp: Date.now() });

        order.executedQty += qty;
        order.remainingQty -= qty;

        top.executedQty += qty;
        top.remainingQty -= qty;

        if (top.remainingQty === 0) bidArr.shift();
      }
      return [order, trades];
    } else {
      return [order, trades];
    }
  }

  getPrice() {
    return this.currentPrice;
  }

  getBookSnapshot() {
    return {
      symbol: this.symbol,
      ask: this.ask.map(a => [a.price, a.remainingQty]),
      bids: this.bids.map(b => [b.price, b.remainingQty])
    };
  }

  // returns all trades (you can change to return last N)
  getLatestTrade() {
    return this.trades;
  }
}

// Export a single global orderbook instance
const BTCUSDOrderBook = new OrderBook("BTC_USD");

// ----------------- OPTIONAL demo/test (comment out in production) -----------------
// BTCUSDOrderBook.placeOrder(100, 5, "LIMIT", "BUY", "Samiya");
// BTCUSDOrderBook.placeOrder(101, 10, "LIMIT", "BUY", "Samiya");
// BTCUSDOrderBook.placeOrder(99, 5, "LIMIT", "BUY", "Samiya");

// BTCUSDOrderBook.placeOrder(102, 5, "LIMIT", "SELL", "Samiya");
// BTCUSDOrderBook.placeOrder(103, 5, "LIMIT", "SELL", "Samiya");
// BTCUSDOrderBook.placeOrder(104, 5, "LIMIT", "SELL", "Samiya");
// BTCUSDOrderBook.placeOrder(101, 3, "LIMIT", "SELL", "Samiya");

// console.log("price before market:", BTCUSDOrderBook.getPrice());
// BTCUSDOrderBook.placeOrder(null, 10, "MARKET", "BUY", "Samiya");
// console.log("price after market:", BTCUSDOrderBook.getPrice());
// console.log(BTCUSDOrderBook.getBookSnapshot());
// console.log(BTCUSDOrderBook.getLatestTrade());
// ---------------------------------------------------------------------------------

module.exports = BTCUSDOrderBook;
