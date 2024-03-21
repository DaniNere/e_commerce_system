const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const cors = require('cors');

// Importar configurações do Swagger
const swaggerConfig = require("./swaggerconfig");

const app = express();  // Inicialize o objeto app aqui

app.use('/api-docs', swaggerConfig.serveSwaggerUI, swaggerConfig.setupSwaggerUI);

const categoriesRoute = require('./routes/categories');
const productRoute = require('./routes/products');
const userRoute = require('./routes/users');
const orderRoute = require('./routes/orders');

const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");

mongoose.connect(process.env.DATABASE_URL).then(() => 
console.log("Banco Conectado")).catch(err => console.log("Erro ao conectar ao banco de dados"));

const api = process.env.API_URL;

// Middleware
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(authJwt);
app.use('/public/uploads', express.static( __dirname + '/public/uploads'));


// Rotas
app.use(`${api}/users`, userRoute);
app.use(`${api}/products`, productRoute);
app.use(`${api}/categories`, categoriesRoute);
app.use(`${api}/orders`, orderRoute);

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
    console.log("O servidor está rodando em http://localhost:3000");
});