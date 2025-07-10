



let products=[
    {
        name:"samsung",
        price:70000,
        quantity:10,
    },
    {
        name:"iphone 13",
        price:1000000,
        quantity:10,
    }
]

let account_balance=200000;

// function buyProduct(product_name,cb) {
//     //some asynchronous operations
//     //1. get product details from product db
//     //2. write order details in user db

//     setTimeout(()=>{
//         console.log("order complete")
//         cb()
//     })
// }

function deductAmount(amount,cb){
    if (amount>account_balance){
        cb("insufficient account balance",null);
    } 
    else {
        account_balance-=amount;
        cb(null,"purchased");
    }
}


buyProduct("iphone 13",function(err,price){
    //console.log("product is purchased")
    if (err) {
       return console.log(err);
       console.log(amount)
    } deductAmount(price,function(price,cb){
        if (err) return console.log(err);
        console.log(message);
    })
})
// console.log("product is purchased")



function buyProduct(product_name,cb){
    let isproduct=null;
    //implement for loop to find product in an array
    //find product object from array who's name is equal to product_name
    for(let i=0;i<products.length;i++){
        //console.log(products[i])
        if(products[i].name==product_name){
            //isproduct=true;
            isproduct=products[i]
            //break;
        }
    }
    //console.log("product available:",isproduct)
    if(!isproduct){
        cb("product not available",null)
    }
    else{
        cb(null,isproduct.price)
    }

}
//buyProduct("samsung",buyProduct)





//problems in callback 
//callback hell-> nested callback [readability less, not managable]