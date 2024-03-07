const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    products: [{
        productId: {
            type: String
        },
        quantity:{
            type: Number,
            default: 1,
        }
    }],
}, 
{ timestamps: true });

module.exports = mongoose.model('Oder', orderSchema);
