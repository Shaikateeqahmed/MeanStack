const mongoose = require('mongoose');

const FeedbackSchema = mongoose.Schema({
   EmailID : String,
   FeedBack : String
})
const FeedBackModel = mongoose.model('FeedBack', FeedbackSchema);

module.exports = {FeedBackModel};