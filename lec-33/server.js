const express = require("express");
const app = express();
const {createClient} = require("redis");
const client= createClient();

async function connect(){
    await client.connect();
    client.on("error",function(err){
        console.log(err)
    })
}
// connect()
// .then(()=>{
//     app.listen(4343, () => { 
//         console.log("Server started on port 4343");
//     });
// })

app.get("/profile",(req,res)=>{
    
})


async function cachedData(){
    await client.connect();
    client.set("users:100",JSON.stringify([{
        name:"Ridhima",
        age:"19"
    
    }]))  
}
// cachedData()
// .then(()=>{
//     console.log("data cached successfully")
// })

async function readUser(){
    await client.connect();
    const data = await client.get("users:100")
    if(data){
        const parsed= JSON.parse(data)
        console.log(parsed)
        return parsed;
    }
    else{
        console.log("no data found")
        return null
    }
}
readUser()
.then(()=>{
    console.log("user fetched successfully")
})