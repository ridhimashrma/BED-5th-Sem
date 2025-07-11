let account_balance = 200000;
let products = [
    {
        name: "samsung",
        price: 70000,
        quantity: 10,
    },
    {
        name: "iphone 13",
        price: 1000000,
        quantity: 10,
    }
];


// function buyProduct(product_name,cb) {
//     //some asynchronous operations
//     //1. get product details from product db
//     //2. write order details in user db

//     setTimeout(()=>{
//         console.log("order complete")
//         cb()
//     })
// }




// Function to find product and return its price
function buyProduct(product_name, cb) {
    let isproduct = null;
    
    //implement for loop to find product in an array
    //find product object from array who's name is equal to product_name
    // Search for the product

    for (let i = 0; i < products.length; i++) {
        if (products[i].name == product_name) {
            isproduct = products[i];
        }
    }

    if (!isproduct) {
        cb("product not available", null);
    } else {
        console.log("order complete");
        cb(null, isproduct.price);
        cb(null, isproduct.price);

    }
}



// Function to deduct amount from account balance
function deductAmount(amount, cb) {
    if (amount > account_balance) {
        cb("insufficient account balance", null);
    } else {
        account_balance -= amount;
        cb(null, "purchased");
    }
}


// Final purchase flow
buyProduct("iphone 13", function (err, price) {
    if (err) return console.log(err);
    console.log(price)

    deductAmount(price, function (err, message) {
        if (err) {
            return console.log(err);
        }

        console.log(message); // "purchased"
        console.log("remaining account balance:", account_balance);
    });
});


//problems in callback 
//callback hell-> nested callback [readability less, not managable]
// no control on your own code









