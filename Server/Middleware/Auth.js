const {userModel} = require('../Models/User');
const jwt =  require('jsonwebtoken');
const Cookies = require('cookie-parser')

let auth = (req, res, next) =>{
    let token = req.cookies.x_auth;
    userModel.findByToken(token,(err,user)=>{
        if (err) throw err;
        if(!user) return res.json({
            isAuth: false,
            error: true
        });
        req.token = token;
        req.user = user;
        next();
    });
    
    };

module.exports = {auth}

/*
if(!token) return res.json({isAuth:false,error:true});
    try{
    const decoded = jwt.verify(token, JWT_SECRET);    
        res.user = decode;
    next();
}
    catch(e){
        res.status(400).json({ msg: 'Token is not valid' });
    }
*/