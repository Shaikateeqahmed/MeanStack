const express = require('express');
const { FeedBackModel } = require('../modules/FeedbackModel');
const FeedBack = express.Router();

FeedBack.get('/',async(req,res)=>{
    res.send('FeedBack Page');
})
FeedBack.post('/',async(req,res)=>{
   let newFeedback = new FeedBackModel(req.body);
   await newFeedback.save();
   res.status(200).json('FeedBack Save Successfully!');
})
module.exports = {FeedBack}