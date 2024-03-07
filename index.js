const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();  // Inicialize o objeto app aqui

app.use(cors());
app.options('*', cors());

const categoriesRoute = require('./routes/categories');
const productRoute = require('./routes/products');
const userRoute = require('./routes/users');
const orderRoute = require('./routes/orders');

// Middleware
app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE_URL).then(() => 
console.log("Banco Conectado")).catch(err => console.log("Erro ao conectar ao banco de dados"));

const api = '/api';
//Routes
//app.use('/api', userRoute);
app.use(`${api}/users`, userRoute);
app.use(`${api}/products`, productRoute);
app.use(`${api}/categories`, categoriesRoute);
//app.use(`${api}/orders`, orderRoute);

app.listen(process.env.PORT || 3000, () => {
    console.log("O servidor está rodando em http://localhost:3000");
});
