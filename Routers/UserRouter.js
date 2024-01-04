const express = require('express');
const bcrypt = require('bcrypt');
const {UserModel} = require('../modules/UserModel.js')
const jws = require('jsonwebtoken');
const { mailfun } = require('../middlewares/mail.js');
const { UserDetailsModel } = require('../modules/UserDetailsModel.js');
const User = express.Router();
require('dotenv').config();
User.post('/',async(req,res)=>{
    try {
        let {UserName, UserEmail, Password, PhoneNo } = req.body;
        const user = await UserModel.find({UserEmail});
        if(user.length>0){
            res.status(409).json(`Opps,User With the Email ID ${UserEmail} is Already Exists!`);
        }else{
            res.status(200).json(`Please See your Email ID :- ${UserEmail} to get an OTP`);
        }
    } catch (error) {
        
    }
});

User.post('/otp',mailfun, async(req,res)=>{
    try {
        let {UserName, UserEmail, Password, PhoneNo } = req.body;
        const user = await UserModel.find({UserEmail});
        if(user.length>0){
            res.status(409).json(`Opps,User With the Email ID ${UserEmail} is Already Exists!`);
        }else{
            res.status(200).json(`Please See your Email ID :- ${UserEmail} to get an OTP`);
        }
    } catch (error) {
        
    }
})

User.post('/signup',async(req,res)=>{
    let {UserName, UserEmail, Password, PhoneNo } = req.body;
    try {
        if(UserName && UserEmail && Password && PhoneNo){
            let users = await UserModel.find({UserEmail});
            if(users.length>0){
                res.status(409).json(`Opps,User With the Email ID ${UserEmail} is Already Exists!`);
            }else{
                bcrypt.hash(Password, 5, async(err,hash)=>{
                    if(err){
                        res.status(500).json(`Opps, Some thing went worng try again after Some time!`);
                    }else{
                        let new_user = new UserModel({UserName, UserEmail, Password:hash, PhoneNo});
                        await new_user.save();
                        let user = await UserModel.find({UserEmail});
                        let token = jws.sign({UserID : user[0]._id},process.env.Key);
                        res.status(200).json({msg : `User, ${req.body.UserName} is SignUp Successfully!`,token:token});
                    }
                })
            }
        }else{
            res.json(`Please Provide All the Fields`);
        }
       
    } catch (error) {
        res.json(error);
    }
});

User.post('/login',async(req,res)=>{
    const {UserEmail, Password} = req.body;
    try {
        if(UserEmail && Password){
            let user = await UserModel.find({UserEmail});
            let userDetails = await UserDetailsModel.find({UserID : user[0]._id});
            if(user.length>0){
                bcrypt.compare(Password,user[0].Password,(err,result)=>{
                    if(result){
                        if(userDetails.length>0){
                            let token = jws.sign({UserID : user[0]._id},process.env.Key);
                            res.status(200).json({token : token, login : true, userDetails : true});
                        }else{
                            let token = jws.sign({UserID : user[0]._id},process.env.Key);
                            res.status(200).json({token : token, login : true, userDetails : false});
                        }
                        
                    }else{
                        res.status(401).json(`Password is incorrect, Please Check the Password`);
                    }
                })
            }else{
                res.status(404).json(`Opps its seems like you not signup yet,Pleaes SignUp First!`)
            }
        }
    } catch (error) {
        console.log(error)
    }
});
User.patch('/forgotPassword',async(req,res)=>{
    let { UserEmail, Password} = req.body;
    try {
        if(UserEmail && Password){
            let users = await UserModel.find({UserEmail});
            if(users.length>0){
                bcrypt.hash(Password, 5, async(err,hash)=>{
                    if(err){
                        res.status(500).json(`Opps, Some thing went worng try again after Some time!`);
                    }else{
                        await UserModel.findByIdAndUpdate({_id : users[0]._id},{Password:hash});
                        res.status(200).json(`User With the Email ID ${UserEmail} Password Change to ${Password}!`);
                    }
                })
                
            }else{
                res.status(404).json(`Email ID ${UserEmail} is not Exist, Please Check the Email ID!`)
            }
        }else{
            res.json(`Please Provide All the Fields`);
        }
       
    } catch (error) {
        res.json(error);
    }
});

module.exports = {User};