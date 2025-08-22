const mongoose=require("mongoose")
const Schema=mongoose.Schema
let addUser=new Schema({
    name:String,
    email:String,
    password:String,
})
module.exports=mongoose.model('model',addUser)
   