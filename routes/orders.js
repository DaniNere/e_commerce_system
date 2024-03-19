const express = require("express");
const router = express.Router(); // Use express.Router() em vez de express()

const Order = require("../models/order");
const OrderItem = require("../models/order-item"); // Importe corretamente o modelo OrderItem

router.get("/", async (req, res) => {
    try {
        const orderList = await Order.find().populate("user", "name").sort({ dateOrdered: -1 }).populate({ 
            path: 'orderItems', populate: { 
            path: 'product', populate: 'category'}
        });
        res.send(orderList);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name");
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.send(order);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
               const orderItemsIds = await Promise.all(req.body.orderItems.map(async (orderItem) => {
                let newOrderItem = new OrderItem({
                quantity: orderItem.quantity,
                product: orderItem.product
            }); 
            
            const savedOrderItem = await newOrderItem.save();
            return savedOrderItem._id;
        }));
        
        const orderItemsIdsResolved = await orderItemsIds;

        const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId) => {
            const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price')
            const totalPrice = orderItem.product.price * orderItem.quantity;
            return totalPrice
        }))
    
        const totalPrice = totalPrices.reduce((a, b) => a+ b , 0 );


        let order = new Order({
            orderItems: orderItemsIds,
            shippingAddress1: req.body.shippingAddress1,
            shippingAddress2: req.body.shippingAddress2,
            city: req.body.city,
            zip: req.body.zip,
            country: req.body.country,
            phone: req.body.phone,
            status: req.body.status,
            totalPrice: totalPrice,
            user: req.body.user
        });
        order = await order.save();
        res.status(201).send(order);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        await Promise.all(order.orderItems.map(async orderItemId => {
            await OrderItem.findByIdAndDelete(orderItemId);
        }));

        await Order.deleteOne({ _id: order._id });

        return res.status(200).json({ success: true, message: 'Order and associated items deleted successfully' });
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
});



module.exports = router;
