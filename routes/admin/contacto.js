var express = require("express");
var router = express.Router();
var contactoModel = require("./../../models/contactoModel");

router.get("/", async function (req, res, next) {
  var contacto;
  if (req.query.q === undefined) {
    contacto = await contactoModel.getContacto();
  } else {
    contacto = await contactoModel.buscarContacto(req.query.q);
  }

  res.render("admin/contacto", {
    layout: "admin/layout",
    usuario: req.session.nombre,
    contacto,
    is_search: req.query.q !== undefined,
    q: req.query.q,
    isContacto: true,
    
  });
});

module.exports = router;
