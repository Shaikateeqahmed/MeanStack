const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    UserName : String,
    UserEmail : String,
    Password : String,
    PhoneNo : String
})

const UserModel = mongoose.model('user',UserSchema);

module.exports = {UserModel};