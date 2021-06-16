var express = require('express');
var router = express.Router();
var contenidoModel = require('../../models/contenidoModel');

/* GET home page. */
router.get('/', async function (req, res, next) {
    var contenido = await contenidoModel.getContenido();

    res.render('admin/contenido',{
       layout: 'admin/layout',
       usuario:req.session.nombre,
       contenido
      }); 
});

module.exports = router;

