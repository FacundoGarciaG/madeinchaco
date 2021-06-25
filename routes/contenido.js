var express = require('express');
var router = express.Router();
var contenidoModel = require('../models/contenidoModel');


/* GET home page. */
/* router.get('/', async function(req, res, next) {
  var contenidos = await contenidoModel.getContenido();

  res.render('contenido', {
    isContenido:true,
    contenidos,
  });
}); */

router.get('/', async function(req, res, next) {
  var contenidos;
  if (req.query.q === undefined) {
    contenidos = await contenidoModel.getContenido();
  } else{
    contenidos = await contenidoModel.buscarContenido(req.query.q);
  }

  res.render('contenido', {
    isContenido:true,
    contenidos,
    is_search:req.query.q !== undefined,
    q:req.query.q
  });
});



module.exports = router;