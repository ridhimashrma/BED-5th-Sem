//file1 product data
//file2 user data
//create orderand store orders in orderhistory file and argument will pass from
//  terminal user name and product name add in order
//find user and then product if both were were their then place order


const fs = require("fs");

const username = process.argv[2];
const productname = process.argv[3];

if (!username || !productname) {
    return console.log("data insufficient");
}

fs.readFile("./users.txt", "utf-8", function (err, data1) {
    if (err) return console.log(err);
    let users = data1.replace(/\r/g, '').split('\n');
    if (!users.includes(username)) return console.log("no user found");

    fs.readFile("./products.txt", "utf-8", function (err, data2) {
        if (err) return console.log(err);
        let products = data2.replace(/\r/g, '').split('\n');
        if (!products.includes(productname)) return console.log("no product found");

        let orderData = {
            user: username,
            product: productname
        };

        
        fs.readFile("./orderHistory.txt", "utf-8", function (err, data3) {
            let orders = [];

            if (!err && data3.trim()) {
                try {
                    orders = JSON.parse(data3);
                } catch (e) {
                    orders = []; // fallback on parse error
                }
            }

            orders.push(orderData);

            fs.writeFile("./orderHistory.txt", JSON.stringify(orders), function (err) {
                if (err) return console.log(err);
                console.log("order placed");
            });
        });
    });
});