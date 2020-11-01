const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51HgrsmFQ8VNGXjFtdHI0uhOZR8BQEvsgifLAEYSMao428LvNVU2WkcVLTmts7COrDUe1Yfy5e16MvDYhE2CVGyS400rBla0JW3');
const uuid = require("uuid");
const { auth } = require('../Middleware/Auth');
const {payment} = require('../Models/Payment');
const { userModel } = require('../Models/User');


router.post('/stripe', auth, (req,res)=>{
    const {price,token,cartDetail,cart} = req.body;
    const idempontencyKey = uuid.v4();
    console.log('Idempotency key: ', idempontencyKey)
    console.log('Stripe Token: ', req.body);
        stripe.customers.create({
            email: token.email,
            source: token.id
        }).then(customer => stripe.charges.create({
                amount: price*100,
                currency: 'usd',
                customer: customer.id,
                receipt_email: token.email,
                description: 'purchase',
                shipping : {
                    name: token.card.name,
                    address: {
                        country: token.card.address_country,
                        line1: token.card.address_line1,
                        postal_code: token.card.address_zip
                    }
                }
            })
        )
        .then(charge => {
            console.log('charge,,,,,,...', charge)
            if(charge.paid){


                const history = [];
                const transaction = {};
                const user = {
                    id: req.user._id,
                    email: req.user.email,
                    name: req.user.name,
                    lastName: req.user.lastName
                }

                cartDetail.forEach(item => {
                    history.push({
                        date: Date.now(),
                        productId: item._id,
                        quantity: item.quantity,
                        price: price,
                        name: item.title,
                        paymentId: charge.source.id

                    })
                });
                transaction.product = history;
                transaction.user = user;
                transaction.data = charge;
                console.log('Trsansction......///////....', transaction)
                userModel.findOneAndUpdate({_id:req.user._id},
                { $push : {history: history}, $set: {cart: []}},
                {new : true},
                (err, user)=>{
                    if(err){
                        console.log('......111111............111111...... not found');
                        res.json('err 1',err);}
                        console.log('......111111........//////....111111...... not found');
                    const paymentModel = new payment(transaction)
                    paymentModel.save((err, info)=>{
                        if(err) res.json({paid: 'false', err: err})
                        console.log('......22222............"222222"......');
                        res.status(200).json(charge)
                    })
                })
            }
        })
        .catch(err => res.status(400).json(err))
})

module.exports = router;