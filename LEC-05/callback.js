let products = [
    { name: "samsung", price: 70000, quantity: 10 },
    { name: "iphone 13", price: 100000, quantity: 5 }
];
let account_balance=2000000;
function buyProduct(product_name) {

    return new Promise((resolve,reject)=>{

        let isproduct = null;
        for (let i = 0; i < products.length; i++) {
            if (products[i].name == product_name) {
                isproduct = products[i];
            }
        }
        if (!isproduct) {
            reject("product not available");
        } else {
            resolve(isproduct.price);
        }
    })
}
function deductAmount(amount) {
    return new Promise((resolve,reject)=>{
        if (amount > account_balance) {
            return reject("insufficient account balance");
        } else {
            account_balance -= amount;
            return resolve("product is purchased");
        }
    })
}




// buyProduct("iphone 13")
//     .then(price => {
//         console.log("product available, Price is:", price);
//     })
//     deductAmount(100000)
//     .then(msg => {
//         console.log(msg)
//         console.log("remaining balance: ", account_balance);
//     })
//     .catch(err => {
//         console.log("Error:", err);
//     });


// deductAmount(100000)
//     .then(msg => {
//         console.log(msg)
//         console.log("remaining balance: ", account_balance);
//     })
//     .catch(err => {
//         console.log("Error:", err);
//     });


    // buyProduct("iphone 13")
    // .then(price => {
    //     console.log("product available, Price is:", price);
    // })
    // deductAmount(100000)
    // .then(msg => {
    //     console.log(msg)
    //     console.log("remaining balance:", account_balance);
    // })
    // .catch(err => {
    //     console.log("Error:", err);
    // });





    // buyProduct("motorolla")
    // .then((data)=> {
    //     return deductAmount(data)
    // })
    // .then(msg => {
    //     console.log(msg)
    //     console.log(account_balance);
    // })
    // .catch(err => {
    //     console.log("Error:", err);
    // });



    // buyProduct("iphone 13")
    // .then((data)=> {
    //     return deductAmount(data)
    // })
    // .then((msg) => {
    //     console.log(msg)
    //     console.log(account_balance);
    // })
    // .catch((err) => {
    //     console.log("Error:", err);
    // });

async function myfunc(){
    try{
        let amount=await buyProduct("iphone 13")  //motorolla -> product not available
        //console.log(amount)
        let msg= await deductAmount(amount)
        console.log(msg)
    }
    catch(err){
        console.log(err)
    }
}
   myfunc();
   console.log("start")
   console.log("end")