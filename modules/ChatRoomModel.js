const mongoose = require('mongoose');

const ChatRoomSchema = mongoose.Schema({
    RoomID : String,
})

const ChatRoomModel = mongoose.model('ChatRoom',ChatRoomSchema);

module.exports = {ChatRoomModel};