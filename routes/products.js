const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const Product = require("../models/product");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
    try {
        let filter = {};
        if(req.query.categories)
        {
            filter = {category: req.query.categories.split(',')};
        }
    
        const productList = await Product.find(filter).populate('category');
        // const productList = await Product.find(filter).select('name image');
        res.status(200).send(productList);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("category");
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.body.category)) {
            return res.status(400).send('Invalid Category ID');
        }
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured
        });
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.body.category)) {
            return res.status(400).send('Invalid Category ID');
        }
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/get/count', async (req, res) => {
    try {
        const productCount = await Product.countDocuments();
        res.status(200).json({ success: true, productCount: productCount });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/get/featured', async (req, res) => {
    try {
        const products = await Product.find({ isFeatured: true });
        if (!products || products.length === 0) {
            return res.status(404).json({ success: false, message: "No featured products found" });
        }
        res.status(200).json({ success: true, products: products });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;