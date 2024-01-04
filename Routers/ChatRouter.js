const express = require('express');
const { ChatModel } = require('../modules/ChatModel.js');
const ChatRouter = express.Router();
const moment = require("moment"); 

ChatRouter.get('/',async(req,res)=>{
    res.send('Chat Page');
})

ChatRouter.get('/:id',async(req,res)=>{
    try {
        let RoomID = req.params.id;
        let UserID = req.body.UserID;
        let chats = await ChatModel.find({RoomID});
        res.status(200).json({chats:chats,UserID : UserID});
    } catch (error) {
        console.log(error);
    }
})
ChatRouter.post('/:id',async(req,res)=>{
    try {
        let RoomID = req.params.id;
        let UserID = req.body.UserID;
        let Text = req.body.Text;
        let fullTimeDate = moment().format("MM/DD/YYYY HH:mm").split(" ")
        let Date = fullTimeDate[0];
        let Time = fullTimeDate[1];
        let Edited = false
        let NewChat = new ChatModel({RoomID,UserID,Text,Date,Time,Edited});
        await NewChat.save();
        res.status(200).json("Chat Post Successfully");
    } catch (error) {
        console.log(error);
    }
})
ChatRouter.delete('/:id',async(req,res)=>{
    try {
        let ID = req.params.id
        await ChatModel.findByIdAndDelete({_id:ID})
        res.status(200).json(`Chat With the ID ${ID} is deleted successfully`);
    } catch (error) {
        console.log(error);
    }
})
ChatRouter.patch('/:id',async(req,res)=>{
    try {
        let ID = req.params.id;
        let payload = req.body;
        await ChatModel.findByIdAndUpdate({_id:ID},payload)
        res.status(200).json(`Chat With the ID ${ID} is deleted successfully`);
    } catch (error) {
        console.log(error);
    }
})
module.exports={ChatRouter};