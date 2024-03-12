const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const category = require("../models/category");



router.get("/", async (req, res) => {
    try {
        const categoryList = await Category.find();
        res.status(200).send(categoryList);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


router.get("/:id", async (req,res) =>{
    try{
        const category = await Category.findById(req.params.id);
        res.status(200).send(category)

    }catch{
        res.status(500).json({sucess: false, message: "The category with the given ID not exists"})

    }
});


router.post("/", async (req, res) => {
    try {
        const { name, icon, color } = req.body;
      
        const newCategory = new Category({
            name: name,
            icon: icon,
            color: color
        });

        
        const savedCategory = await newCategory.save();

        if (!savedCategory) {
            return res.status(404).send("Category cannot be created");
        }

        res.status(201).send(savedCategory);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.put("/:id", async (req,res) =>{
    try{
        const category = await Category.findByIdAndUpdate(req.params.id, {
            name: req.body.nome,
            icon: req.body.icon,
            color: req.body.color
        },{
            new: true            
        })
        res.send(category);

    }catch{
        return res.status(404).send("Category cannot be created") 
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndRemove(req.params.id);

        if (deletedCategory) {
            return res.status(200).json({ success: true, message: "Category deleted successfully" });
        } else {
            return res.status(404).json({ success: false, message: "Category not found" });
        }
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
});

module.exports = router;