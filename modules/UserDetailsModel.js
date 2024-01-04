const mongoose = require('mongoose');

const UserDetailsSchema = mongoose.Schema({
    UserID : String,
    name : String,
    dateOfBirth : String,
    location : String,
    profilePic : String,
    profession : String,
    discription : String,
    skills : Array,
    tech : Array,
    experiance : String
})

const UserDetailsModel = mongoose.model('userDetail',UserDetailsSchema);

module.exports ={ UserDetailsModel };