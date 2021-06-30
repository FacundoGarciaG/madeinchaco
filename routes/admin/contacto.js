var express = require("express");
var router = express.Router();


router.get('/', function(req,res,next) {
    res.render('admin/contacto', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        isContacto:true,
    });
});

module.exports= router;