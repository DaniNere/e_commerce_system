const express = require("express");
const router = express.Router(); // Use express.Router() em vez de express()

const Order = require("../models/order");
const OrderItem = require("../models/OrderItem"); // Importe corretamente o modelo OrderItem

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
        const orderItemsIds = await Promise.all(req.body.orderItems.map(async orderItemData => {
            let newOrderItem = new OrderItem({
                quantity: orderItemData.quantity,
                product: orderItemData.product
            });
            const savedOrderItem = await newOrderItem.save();
            return savedOrderItem._id;
        }));

        let order = new Order({
            orderItems: orderItemsIds,
            shippingAddress1: req.body.shippingAddress1,
            shippingAddress2: req.body.shippingAddress2,
            city: req.body.city,
            zip: req.body.zip,
            country: req.body.country,
            phone: req.body.phone,
            status: req.body.status,
            totalPrice: req.body.totalPrice,
            user: req.body.user
        });
        order = await order.save();
        res.status(201).send(order);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
