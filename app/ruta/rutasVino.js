const express = require('express');
const ControladorVinos = require('../controlador/ControladorVinos');

const Router = express.Router(); //Usar el router e inerpretar las rutas como tal

Router.get('/',ControladorVinos.index)
      .post('/',ControladorVinos.crear)
      .get('/:key/:value',ControladorVinos.buscar,ControladorVinos.mostrar)
      .put('/:key/:value',ControladorVinos.buscar,ControladorVinos.actualizar)
      .delete('/:key/:value',ControladorVinos.buscar,ControladorVinos.eliminar);
module.exports = Router;
