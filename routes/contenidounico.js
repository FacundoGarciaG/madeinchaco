var express = require('express');
var router = express.Router();
var contenidoModel = require('../models/contenidoModel');

router.get("/:id", async (req, res, next) => {
    var id = req.params.id;
    var contenido = await contenidoModel.getContenidoByID(id);
    res.render("contenidounico", {
    contenido,
    });
  });

  
module.exports = router;