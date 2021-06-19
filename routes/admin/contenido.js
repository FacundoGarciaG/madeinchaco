var express = require('express');
var router = express.Router();
var contenidoModel = require('../../models/contenidoModel');


/* GET home page. */
router.get('/', async function (req, res, next) {
    var contenido = await contenidoModel.getContenido();

    res.render('admin/contenido', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        contenido
    });
}); 

router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar', { // llama agregar.hbs
        layout: 'admin/layout'
    });

});

// AGREGA
router.post('/agregar', async (req, res, next) => {
    try{
        if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "" ){
            await contenidoModel.insertContenido(req.body);
            res.redirect('/admin/contenido');
        } else {
            res.render('admin/agregar', {
                layout:'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            });
        }
    } catch(error){
        console.log(error)
        res.render('admin/agregar',{
            layout:'admin/layout',
            error:true,
            message:'No se pudo cargar la novedad' 
        });
    } 

}); 

// ELIMINA

router.get('/eliminar/:id', async (req,res,next) => {
    var id = req.params.id;
    await contenidoModel.deleteContenidoByID(id);
    res.redirect('/admin/contenido');
});

// SELECCIONA PARA MODIFICAR

router.get('/modificar/:id', async (req,res,next) => {
    var id = req.params.id;
    var contenido = await contenidoModel.getContenidoByID(id);
    res.render('admin/modificar', {
        layout:'admin/layout',
        contenido
    })
});

//MODIFICAR

router.post('/modificar', async(req,res,next) => {
    try{
        var obj = {
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            cuerpo:req.body.cuerpo,
            //id: req.body.id
        }

        //console.log(obj)

        /* if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "" ){
            await contenidoModel.modificarContenidoByID(obj, req.body.id);
            res.redirect('/admin/contenido');
        } else {
            res.render('admin/modificar', {
                layout:'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            });
        } */

        await contenidoModel.modificarContenidoByID(obj, req.body.id);
        res.redirect('/admin/contenido'); 
 
    } catch(error) {
        console.log(error);
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se pudo modificar el contenido'
        });
    }
});




module.exports = router;