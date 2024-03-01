const express = require("express");
const app = express(); 
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
require('dotenv').config();

const userRoute = require('./routes/user');

// Middleware
app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE_URL).then(() => console.log("Banco Conectado")).catch(err => console.log("Erro ao conectar ao banco de dados"));

app.use('/api', userRoute);

app.listen(3000, () => {
    console.log("O servidor está rodando em http://localhost:3000");
});
