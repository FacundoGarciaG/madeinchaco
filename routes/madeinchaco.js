var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('madeinchaco', {
    layout:'layout2'
  });
});

module.exports = router;