var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('admin/contenido',{
       layout: 'admin/layout',
       usuario:req.session.nombre
      }); 
});

module.exports = router;