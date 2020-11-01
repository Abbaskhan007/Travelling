const express = require('express');
const router = express.Router();
const { userModel } = require('../Models/User');
const { auth } = require('../Middleware/Auth');
const jwt =  require('jsonwebtoken');
var bcrypt = require('bcrypt');
const payment = require('../Models/Payment')

router.post("/register", (req, res) => {
    try{
    const user = new userModel(req.body);
    user.save(err => {
        if (err) {
            return res.json({ success: 'false', err })
        }
        const token = jwt.sign({ id: user._id }, 'secret', {
            expiresIn: 3600
          });
        return res.status(200).json({ isAuth: true, token })
    });}
    catch(e){
        res.status(400).json({msg: e.message})
    }

})

//})

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        isAuth: true,
        user: req.user
    })
})

router.post("/login",  (req, res) => {
    
    userModel.findOne({ 'email': req.body.email }, function(err, user) {   
        if(err) return res.json({isAuth:false,err})
        if (!user) return res.json({
                isAuth: false,
                message: 'Email not found'
        
            });
            
            bcrypt.compare(req.body.password, user.password,function(err,isMatch){
                
                if(err) return res.json({ isAuth: false, err, message: "Password not match" });
                else if(!isMatch) return res.json({ isAuth: false, message: "Password not match" })
                if(isMatch){
                    const token = jwt.sign({ id: user._id },'secret' );
                    if (!token) return res.json({isAuth: false,msg:'Couldnt sign the token'})
                res.status(200).json({
                    isAuth:true,
                    token   
            })
                } 
            })        
    })
    })  

    router.post("/addToCart",(req,res)=>{

        try{console.log('Add to cart....',req.body)
        let duplicate = false;
        userModel.findOne({'_id':req.body.id}, (err,info)=>{
            if(err) throw err;
            info.cart.forEach(item => {
                console.log('Item..........',item, 'ProductID',req.body.productId)
                if (item.id === req.body.productId){
                    duplicate = true;
                    console.log('Duplicate......')
                }
            });

            console.log('info',info);
            if(duplicate){
                userModel.findOneAndUpdate({_id: req.body.id, 'cart.id':req.body.productId},
                {$inc :{"cart.$.quantity":1}},
                {new:true},
                (err,info)=>{
                    if (err) return res.json({success:false, err})
                    res.status(200).json({success: true, cart:info.cart})
                }
                )
            }
            else{
            userModel.findOneAndUpdate(
                {_id: req.body.id},
                {
                    $push: {
                        cart: {
                            id: req.body.productId,
                            quantity: 1,
                            date: Date.now()
                        }
                    }
                },
                {new: true},
                (err,userInfo)=>{
                    if (err) return res.json({success:false,err});
                    res.json({success: true, cart: userInfo.cart})
                }
            )   }         
        })}
        catch(e){
            res.json({message:e})
        }       
    })


    router.post('/removeFromCart',auth,(req,res)=>{
        const id = req.user._id;
        console.log('113 id',req.body.id)
        userModel.findOneAndUpdate({_id:id},
            {"$pull":{
                "cart" : {"id": req.body.id}
            }}
            ,
            {new: true},(err,userInfo)=>{
                if(err) throw err;
                res.status(200).json({
                    cart: userInfo.cart
                })
            })
    })

    router.post('/changeQuantity',auth,(req,res)=>{
        const id = req.user._id;
        const num = req.body.num;
        userModel.findOneAndUpdate({_id:id,'cart.id':req.body.id},
            {
                $inc: {"cart.$.quantity":num}   
            },
            {new: true},(err,userInfo)=>{
                if(err) throw err;
                res.status(200).json({
                    cart: userInfo.cart
                })
            })
    })

    router.post('/payment',auth, (req,res)=>{
        const history = [];
        const transaction = [];

        req.body.cartDetail.forEach(item=>{
            history.push({
                date: Date.now(),
                userId : item._id,
                name: item.title,
                price: item.price,
                quantity: item.quantity,
                paymentId : req.body.data.paymentId
            })
        })

        transaction.user = {
            id: req.user._id,
            name: req.user.name,
            lastName: req.user.lastName,
            email: req.user.name,
        }

        transaction.product = req.body.cartDetail;

        transaction.data = req.body.data;

        userModel.findOneAndUpdate({_id:req.user._id},
            {$push: {history: history}, $set: { cart: [] }},
            {new: true},
            (err, user) =>{
                if(err) res.status('400').json({
                    success:false,err
                })
                const payment = new payment(transaction);
                payment.save((err,user)=>{
                    res.status('200').json({success:true,user})
                })

            }
            )
    })

    router.post('/history',auth, (req, res)=>{
        userModel.findOne({_id: req.user._id},(err, user)=>{
            if(err) res.status(400).json({success: false,err})
            res.status(200).json({success: true, historyData: user.history})
        })
    })

module.exports = router;
            
       