const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = new schema({
    title:{
        type: String,
        maxlength: 50
    },
    description:{
        type: String,     
    },
    price:{
        type: Number,
        default: 0
    },
    image:{
        type: Array,
        default: []
    },
    continent:{
        type: 'String',
        default: 'Africa'
    },
    sold:{
        type: Number,
        default: 0,
        maxlength: 100
    },
    views: {
        type: Number,
        default: 0
    }
},{timestamps: true})



const productModal = mongoose.model('Product',productSchema);

module.exports = {productModal}