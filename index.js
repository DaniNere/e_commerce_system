const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();  // Inicialize o objeto app aqui

const categoriesRoute = require('./routes/categories');
const productRoute = require('./routes/products');
const userRoute = require('./routes/users');
//const orderRoute = require('./routes/orders');

const authJwt = require("./helpers/jwt"); // Importe o middleware authJwt após a definição das rotas
const errorHandler = require("./helpers/error-handler");

mongoose.connect(process.env.DATABASE_URL).then(() => 
console.log("Banco Conectado")).catch(err => console.log("Erro ao conectar ao banco de dados"));

const api = "/api";

// Middleware
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authJwt); // Coloque o middleware authJwt após a definição das middleware de body parser
//app.use(morgan('tiny'));

// Rotas
app.use(`${api}/users`, userRoute);
app.use(`${api}/products`, productRoute);
app.use(`${api}/categories`, categoriesRoute);
//app.use(`${api}/orders`, orderRoute);

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
    console.log("O servidor está rodando em http://localhost:3000");
});
