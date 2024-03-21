const express = require("express");
const router = express.Router(); // Use express.Router() em vez de express()

const Order = require("../models/order");
const OrderItem = require("../models/order-item"); // Importe corretamente o modelo OrderItem

/**
 * @swagger
 * tags:
 *   - name: Orders
 *     description: Operações relacionadas a Pedidos
 */
/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Lista de pedidos
 *     tags: [Orders]
 *     description: Retorna uma lista de todos os pedidos
 *     responses:
 *       '200':
 *         description: Sucesso na obtenção da lista de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       '500':
 *         description: Erro interno do servidor
 */

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

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Detalhes do pedido
 *     tags: [Orders]
 *     description: Retorna os detalhes de um pedido específico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do pedido
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Sucesso na obtenção dos detalhes do pedido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '500':
 *         description: Erro interno do servidor
 */

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

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Criar novo pedido
 *     tags: [Orders]
 *     description: Cria um novo pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewOrder'
 *     responses:
 *       '201':
 *         description: Pedido criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '500':
 *         description: Erro interno do servidor
 */

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

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Excluir pedido existente
 *     tags: [Orders]
 *     description: Exclui um pedido existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do pedido
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Pedido excluído com sucesso
 *       '404':
 *         description: Pedido não encontrado
 *       '500':
 *         description: Erro interno do servidor
 */

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

/**
 * @swagger
 * /api/orders/count:
 *   get:
 *     summary: Contagem total de pedidos
 *     tags: [Orders]
 *     description: Retorna o número total de pedidos
 *     responses:
 *       '200':
 *         description: Sucesso na obtenção da contagem de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderCount:
 *                   type: number
 *       '500':
 *         description: Erro interno do servidor
 */


router.get('/count', async (req, res) => {
    try {
        const orderCount = await Order.countDocuments();
        res.status(200).send({ orderCount: orderCount });
    } catch (error) {
        res.status(500).json({ success: false });
    }        
});

/**
 * @swagger
 * /api/orders/totalsales:
 *   get:
 *     summary: Total de vendas
 *     tags: [Orders]
 *     description: Retorna o total de vendas
 *     responses:
 *       '200':
 *         description: Sucesso na obtenção do total de vendas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalSales:
 *                   type: number
 *       '400':
 *         description: O total de vendas não pode ser gerado
 *       '500':
 *         description: Erro interno do servidor
 */

router.get("/totalsales", async (req, res) => {
    try {
        const orders = await Order.find();
        console.log('Orders:', orders); // Verifica se os documentos estão sendo recuperados corretamente
        let totalSales = 0;
        orders.forEach(order => {
            console.log('Order:', order); // Verifica o conteúdo de cada documento
            totalSales += order.totalPrice;
        });
        console.log('Total Sales:', totalSales); // Verifica o total de vendas calculado
        res.send({ totalSales });
    } catch (error) {
        console.error('Error:', error);
        return res.status(400).send('The total sales cannot be generated');
    }
});

/**
 * @swagger
 * /api/orders/usersorders/{userid}:
 *   get:
 *     summary: Pedidos do usuário
 *     tags: [Orders]
 *     description: Retorna os pedidos de um usuário específico
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Sucesso na obtenção dos pedidos do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       '500':
 *         description: Erro interno do servidor
 */
router.get('/usersorders/:userid', async (req, res) => {
    try{
        const userOrderList = await Order.find({user: req.params.userid})
        .populate({
            path: 'orderItems', populate: {
                path: 'product', populate: 'category'
            }
        }).sort({ 'dateOrdered': -1 });

        res.send(userOrderList)

    }catch(error){
        res.status(500).json({ success: false })
    };
});


module.exports = router;
