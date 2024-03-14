const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity:{
            type: Number,
            default: 1,
        }
    }],
}, 
{ timestamps: true });

module.exports = mongoose.model('Oder', orderSchema);
