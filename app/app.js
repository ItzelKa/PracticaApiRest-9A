const express = require('express');
const rutasVinos = require ('./ruta/rutasVino');
const rutasRefrescos = require ('./ruta/rutasRefresco');

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/vinos',rutasVinos),//empoint raiz
app.use('/refrescos',rutasRefrescos); //Segunda raiz

//Importar la contante que vamos a usar en el server
//inicializar express
module.exports = app;