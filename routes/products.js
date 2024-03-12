const express = require("express");
const router = express.Router();
const Category = require("../models/category")
const Product = require("../models/product");
const { create } = require("../controlers/user");

router.get("/", async (req, res) =>{
try{
    const productList= await Product.find().select("name image");
    res.status(200).send(productList);
}catch(error){
    res.status(500).json({sucess:false, error: error.message})
} 
});

router.get("/:id", async (req, res) =>{
    try{
        const product = await Product.findById(req.params.id).populate("category");
        res.status(200).send(product)
    }catch(error){
        res.status(500).json({ sucess: false, message: "The product with the given ID not exists"})
    }
    
});

router.post("/", async (req, res) => {
    try {
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

  router.put("/:id", async(req, res) =>{

    try{
        const category = await Category.findById(req.body.category);

    if (!category) {
  return res.status(400).json({ success: false, message: 'Invalid category' });
    }

    const product = await Product.findByIdAndUpdate(req.params.id, {
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
        
    }, {
        new: true
    });

    return res.status(200).json({ success: true, message: 'Product updated successfully', product });

    }catch(error){
        return res.status(500).json({ success: false, message: error.message });
    }
  })
  
  module.exports = router;

