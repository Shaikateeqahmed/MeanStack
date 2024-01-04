const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = async(req,res,next)=>{
    let token = req.headers.authorization;
    if(token){
         jwt.verify(token,process.env.Key,(err,decode)=>{
            if(err){
                res.json('Login First');
            }else{
                let UserID = decode.UserID;
                req.body.UserID = UserID;
                next();
            }
         })
    }else{
        res.json('Login First')
    }
}


module.exports = {authenticate};