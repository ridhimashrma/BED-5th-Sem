const moongoose = require('mongoose');  
const userSchema = new moongoose.Schema({
    name: String,
    email: String,
    password: String
});
module.exports = moongoose.model('User', userSchema);