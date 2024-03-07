const espress = require("express");
const router = express();

const Category = require("../models/category");
const category = require("../models/category");

router.get("/", async (req,res) =>{
    const categoryList = await Category.find();

    if(!categoryList) {
        res.status(500).json({ sucess: false})
    }
    res.send(categoryList)
})

router.post("/", async (req, res) =>{
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
})

category = await category.save();

if (!category){
    return res.status(404).send("Category cannot be created")
    res.send(category);
}

router.delete("/:id", (req, res) =>{
    Category.findByAndRemove(req.params.id).then(category =>{
        if(category) {
            return res.status(200).json({sucess : true, message: "Category deleted sucessfully"})
        } else {
            return res.status(404).json({ sucess: false, message: "Category cannot find"})
        }
    }).catch (err => {
        return res.status(400).json({ sucess: false, error: err})
    })
})

module.exports = router