const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var saltRounds = 10;
var jwt = require('jsonwebtoken');

const userSchema = new Schema({
    name:{
        type: String,
        maxlength: 50
    },
    email:{
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 6
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    cart:{
        type: Array,
        default: []
    },
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    }
},
{timestamps:true});

userSchema.pre('save', function( next ) {
    var user = this;
    if(user.isModified('password')){
    bcrypt.genSalt(saltRounds, function(err,salt){
        if(err) return next(err);

        bcrypt.hash(user.password,salt, function(err,hash){
            if(err) return next(err);
            user.password = hash;
            console.log('hashing.....')
            next();
          })
    } 
    )}
    else{
        next();
    }
});

userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    jwt.verify(token, 'secret', function (err, decode) {
        console.log('Decode.............',decode)
        user.findOne({ _id : decode.id}, function (err, user) {
            if (err) return cb(err);
            cb(null, user);
        })
    })
}

const userModel = mongoose.model('User',userSchema);

module.exports = {userModel};