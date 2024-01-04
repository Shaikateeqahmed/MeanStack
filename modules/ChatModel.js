const mongoose = require('mongoose');

const ChatShema = mongoose.Schema({
    RoomID : String,
    UserID : String,
    Text : String,
    Date : String,
    Time : String,
    Edited : Boolean
})
const ChatModel = mongoose.model('chat',ChatShema);

module.exports = {ChatModel};