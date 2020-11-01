const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    user: {
        type: 'Array',
        default: []
    },
    data: {
        type: 'Array',
        default: []
    },
    product: {
        type: 'Array',
        default: []
    }
},{timestamps: true})

const payment = mongoose.model('payment',paymentSchema);

module.exports= {payment}