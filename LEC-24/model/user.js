const mongoose=require("mongoose")
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  blogs:[
    {
      type:mongoose.Types.ObjectId,
      ref:"Blogs"
    }
  ]
});

module.exports=mongoose.model('User', UserSchema)