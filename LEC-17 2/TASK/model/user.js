const mongoose=require("mongoose")
const Schema=mongoose.Schema
const addUSer=new Schema({
    name:String,
    email:String,
    password:String,
    date:Date

})
module.exports=mongoose.model('Users',addUSer)