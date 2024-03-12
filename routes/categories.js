const express = require("express");
const router = express.Router();
const Category = require("../models/category");



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
        const category = await Category.findId(req.params.id);
        res.status(200).send(category)

    }catch{
        res.status(500).json({sucess: false})

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