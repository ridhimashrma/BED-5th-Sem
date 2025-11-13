const express=require("express")
const app=express()
let {publisher}=require ("../shared/index")
app.use(express.json())




app.use("/api/v1/order",require("./routes/order"))




app.listen(8090,()=>{
    console.log("server started")
})


publisher.connect()
.then(()=>{
    console.log("Publisher client connected")
})
