const express = require('express');
const {UserDetailsModel} = require('../modules/UserDetailsModel.js');
const UserDetails = express.Router();

UserDetails.get('/',async(req,res)=>{
    try {
        let userId = req.body.UserID;
        let user = await UserDetailsModel.find({UserID:userId})
        let profession = user[0].profession;
        let users = await UserDetailsModel.find({profession});
        let related =users.filter((el)=>{
            if(el.UserID!==userId){
                return el;
            }
        })
        let allusers = await UserDetailsModel.find({});
        let other = allusers.filter((el)=>{
            if(el.profession!==profession){
                return el;
            }
        })
       res.status(200).json({related:related,otherusers:other}); 
    } catch (error) {
        res.status(500).json(error.error);
    }
      
})

UserDetails.get('/userDetails',async(req,res)=>{
  try {
    let ID = req.body.UserID
    let user = await UserDetailsModel.findOne({UserID : ID});
    res.status(200).json(user);
  } catch (error) {
    console.log(error)
  }
})
UserDetails.patch('/:id',async(req,res)=>{
    try {
        let ID = req.params.id;
        let payload = req.body;
        await UserDetailsModel.findByIdAndUpdate({_id:ID},payload);
        res.status(200).json(`Details Of a ${req.body.name} is updated Successfully!`);
    } catch (error) {
        console.log(error);
    }
})
UserDetails.post('/',async(req,res)=>{
    try {
        let newUser = new UserDetailsModel(req.body);
        await newUser.save()
       res.status(200).json(`User Details Register Successfully!`); 
    } catch (error) {
        console.log(error);
        res.status(500).json(error.error);
    }
      
})

module.exports = {UserDetails};