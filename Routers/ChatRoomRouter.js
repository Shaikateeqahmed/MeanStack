const express = require('express');
const { ChatRoomModel } = require('../modules/ChatRoomModel');

const ChatRoom = express.Router();

ChatRoom.get('/',async(req,res)=>{
    res.send('Chat Room Page');
});
ChatRoom.post('/createChatRoom/:id',async(req,res)=>{
    try {
        let User1ID = req.body.UserID
        let User2ID = req.params.id;
        let RoomID = User1ID+" "+User2ID;
        let Roomid = User2ID+" "+User1ID;
        let room = await ChatRoomModel.find({RoomID});
        let Room = await ChatRoomModel.find({RoomID:Roomid});
        if(room.length>0 || Room.length>0){
            if(room.length>0){
                res.status(409).json({msg:`Room Already Exist!`,RoomID:RoomID});
            }else if(Room.length>0){
                res.status(409).json({msg:`Room Already Exist!`,RoomID:Roomid});
            }
        }else{
            let newRoom = new ChatRoomModel({RoomID});
            await newRoom.save();
            res.status(200).json({msg : `New Chat Room Creating Successfully!`, RoomID : RoomID});
        }
    } catch (error) {
        res.status(500).json(error.error);
    }
});

ChatRoom.post('/generalChannal',async(req,res)=>{
    try {
    //    console.log("generalChannal");
        let Room = await ChatRoomModel.find({RoomID:"GeneralChannal"});
        if(Room.length>0){
                res.status(409).json({msg:`Room Already Exist!`,RoomID:"GeneralChannal"});
        }else{
            let newRoom = new ChatRoomModel({RoomID:"GeneralChannal"});
            await newRoom.save();
            res.status(200).json({msg : `New Chat Room Creating Successfully!`, RoomID:"GeneralChannal"});
        }
    } catch (error) {
        res.status(500).json(error.error);
    }
})
module.exports ={ChatRoom};