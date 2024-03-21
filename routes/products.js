const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const Product = require("../models/product");
const mongoose = require("mongoose");
const multer = require("multer");

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('Invalid Image Type');
        if(isValid){
            uploadError = null
        }
        cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split('').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
})

const upload  = multer({ storage: storage })
/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Operações relacionadas a Produtos
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Lista de produtos
 *     tags:
 *       - Products
 *     description: Retorna uma lista de produtos de acordo com os filtros fornecidos.
 *     parameters:
 *       - in: query
 *         name: categories
 *         description: Filtrar por categorias (separadas por vírgula)
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Sucesso na obtenção da lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       '500':
 *         description: Erro interno do servidor
 */

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
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Retorna um produto pelo ID
 *     tags:
 *       - Products
 *     description: Retorna um produto específico com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do produto a ser retornado
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Sucesso na obtenção do produto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '404':
 *         description: Produto não encontrado
 *       '500':
 *         description: Erro interno do servidor
 */


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
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Cria um novo produto
 *     tags:
 *       - Products
 *     description: Cria um novo produto com os dados fornecidos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       '201':
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '400':
 *         description: ID de categoria inválido
 *       '500':
 *         description: Erro interno do servidor
 */

router.post("/", upload.single("image"), async (req, res) => {

    try {
        if (!mongoose.Types.ObjectId.isValid(req.body.category)) {
            return res.status(400).send('Invalid Category ID');
        }

        const file = req.file;
    if (!file)
        return res.status(400).send('No image in the request')

    const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;


        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: `${basePath}${fileName}`,
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
/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Atualiza um produto existente
 *     tags:
 *       - Products
 *     description: Atualiza um produto existente com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do produto a ser atualizado
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       '200':
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '400':
 *         description: ID de categoria inválido
 *       '404':
 *         description: Produto não encontrado
 *       '500':
 *         description: Erro interno do servidor
 */


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
/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Remove um produto existente
 *     tags:
 *       - Products
 *     description: Remove um produto existente com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do produto a ser removido
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Produto removido com sucesso
 *       '404':
 *         description: Produto não encontrado
 *       '500':
 *         description: Erro interno do servidor
 */
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
/**
 * @swagger
 * /api/products/get/count:
 *   get:
 *     summary: Retorna o número total de produtos
 *     tags:
 *       - Products
 *     description: Retorna o número total de produtos na base de dados.
 *     responses:
 *       '200':
 *         description: Sucesso na obtenção do número total de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica se a operação foi bem-sucedida
 *                 productCount:
 *                   type: number
 *                   description: O número total de produtos
 *       '500':
 *         description: Erro interno do servidor
 */

router.get('/get/count', async (req, res) => {
    try {
        const productCount = await Product.countDocuments();
        res.status(200).json({ success: true, productCount: productCount });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
/**
 * @swagger
 * /api/products/get/featured:
 *   get:
 *     summary: Retorna produtos em destaque
 *     tags:
 *       - Products
 *     description: Retorna uma lista de produtos em destaque.
 *     responses:
 *       '200':
 *         description: Sucesso na obtenção de produtos em destaque
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       '404':
 *         description: Nenhum produto em destaque encontrado
 *       '500':
 *         description: Erro interno do servidor
 */

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

/**
 * @swagger
 * /api/products/gallery-images/{id}:
 *   put:
 *     summary: Atualiza as imagens da galeria de um produto
 *     tags:
 *       - Products
 *     description: Atualiza as imagens da galeria de um produto existente com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do produto cuja galeria de imagens será atualizada
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       '200':
 *         description: Galeria
 */

router.put('/gallery-images/:id', upload.array('images', 10), async (req, res) => {

    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Invalid Product ID')
    }

    const files = req.files;
    let imagesPaths = [];
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
    if(files){
        files.map(file => {
            imagesPaths.push(`${basePath}${file.fileName}`);
        })
    }

    const product = await Product.findByIdAndUpdate(req.params.id, {

        image: imagesPaths,
    },
    {
        new: true
    })

    if (!product)
        return res.status(500).send('Product cannot be updated')
    res.send(product);
})

module.exports = router;