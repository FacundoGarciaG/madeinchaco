var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contenido', {
    isContenido:true
  });
});

module.exports = router;