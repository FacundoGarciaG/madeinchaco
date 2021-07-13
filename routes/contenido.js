var express = require('express');
var router = express.Router();
var contenidoModel = require('../models/contenidoModel');


router.get('/', async function(req, res, next) {
  var contenidos;
    contenidos = await contenidoModel.getContenido();
  
  
   
  res.render('contenido', {
    isContenido:true,
    contenidos,
  });
});

module.exports = router;