var express = require('express');
var router = express.Router();

var usuariosModel = require('./../../models/usuariosModel');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('admin/login',{
       layout: 'admin/layout'
      }); 
});

//LOGOUT
router.get('/logout', function(req,res,next){
    req.session.destroy(); 
    res.render('admin/login', {
        layout: 'admin/layout'
    });
})

//LOGIN
router.post('/', async(req, res, next) =>{
    try{
        var usuario = req.body.usuario;
        var password = req.body.password;
       
        var data = await usuariosModel.getUserByUsernameAndPassword(usuario,password);

        if(data != undefined){
            req.session.id_usuario = data.id; //toma de la query de la tabla
            req.session.nombre = data.usuario; // madeinchaco

            res.redirect('/admin/contenido');
        }else{
            res.render('admin/login',{
                layout: 'admin/layout', 
                error: true
            });
        }
    }catch(error){
        console.log(error);
    }// cierro catch

}); // cierro router.post


module.exports = router;