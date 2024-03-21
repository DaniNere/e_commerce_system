const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const category = require("../models/category");

/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: Operações relacionadas a Categorias
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Lista de categorias
 *     tags: [Categories]
 *     description: Retorna uma lista de todas as categorias
 *     responses:
 *       '200':
 *         description: Sucesso na obtenção da lista de categorias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       '500':
 *         description: Erro interno do servidor
 */
router.get("/", async (req, res) => {
    try {
        const categoryList = await Category.find();
        res.status(200).send(categoryList);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Detalhes da categoria
 *     tags: [Categories]
 *     description: Retorna os detalhes de uma categoria específica
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da categoria
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Sucesso na obtenção dos detalhes da categoria
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       '500':
 *         description: Erro interno do servidor
 */

router.get("/:id", async (req,res) =>{
    try{
        const category = await Category.findById(req.params.id);
        res.status(200).send(category)

    }catch{
        res.status(500).json({sucess: false, message: "The category with the given ID not exists"})

    }
});

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Criar nova categoria
 *     tags: [Categories]
 *     description: Cria uma nova categoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCategory'
 *     responses:
 *       '201':
 *         description: Categoria criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       '500':
 *         description: Erro interno do servidor
 */

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

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Atualizar categoria existente
 *     tags: [Categories]
 *     description: Atualiza os detalhes de uma categoria existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da categoria
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       '200':
 *         description: Categoria atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       '404':
 *         description: Categoria não encontrada
 *       '500':
 *         description: Erro interno do servidor
 */

router.put("/:id", async (req,res) =>{
    try{
        const category = await Category.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
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
/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Excluir categoria existente
 *     tags: [Categories]
 *     description: Exclui uma categoria existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da categoria
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Categoria excluída com sucesso
 *       '404':
 *         description: Categoria não encontrada
 *       '500':
 *         description: Erro interno do servidor
 */
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