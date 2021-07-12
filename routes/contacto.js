var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var contactoModel = require('./../models/contactoModel');
/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('contacto', {
    isContacto: true,
  });
});

router.post('/', async (req, res, next) => {

  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var telefono = req.body.telefono;
  var email = req.body.email;
  var comentarios = req.body.comentarios;

  //console.log(req.body);

  var obj = {
    to: 'madeinchacoargentina@gmail.com',
    subjet: 'Contacto desde la web',
    html: nombre + ' ' + apellido + ' se contacto a traves de la web y este es su correo: ' + email + '<br> Hizo el siguiente comentario: ' + comentarios + '<br> Su numero de contacto es: ' + telefono
  }

  var transport = nodemailer.createTransport({
    host:process.env.SMTP_HOST,
    port:process.env.SMTP_PORT,
    auth:{
      user:process.env.SMTP_USER,
      pass:process.env.SMTP_PASS
    }
  });

  var contacto = await contactoModel.insertContacto(req.body);
  var info = await transport.sendMail(obj);
  
  res.render('contacto', {message: 'MENSAJE ENVIADO!',
volver: '/contacto',
X: 'X' });
});




module.exports = router;