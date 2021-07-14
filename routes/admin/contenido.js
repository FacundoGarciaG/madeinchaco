var express = require("express");
var router = express.Router();
var contenidoModel = require("../../models/contenidoModel");
var cloudinary = require("cloudinary").v2;
var fs = require("fs-extra");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloudinary_url: process.env.CLOUDINARY_URL,
});

/* GET home page. */

/*MUESTRA Y BUSCA*/

router.get("/", async function (req, res, next) {
  var contenidos;
  if (req.query.q === undefined) {
    contenidos = await contenidoModel.getContenido();
  } else {
    contenidos = await contenidoModel.buscarContenido(req.query.q);
  }

  res.render("admin/contenido", {
    layout: "admin/layout",
    usuario: req.session.nombre,
    contenidos,
    is_search: req.query.q !== undefined,
    q: req.query.q,
    isContenido: true,
  });
});

router.get("/agregar", (req, res, next) => {
  res.render("admin/agregar", {
    // llama agregar.hbs
    layout: "admin/layout",
  });
});

// AGREGA
router.post("/agregar", async (req, res, next) => {
  try {
    if (
      req.body.titulo != "" &&
      req.body.subtitulo != "" &&
      req.body.cuerpo != ""
    ) {
      var result = await cloudinary.uploader.upload(req.file.path);
      console.log(result);
      await contenidoModel.insertContenido(req.body, result.url);
      console.log(req.body);
      console.log(req.file);
      await fs.unlink(req.file.path);
      res.redirect("/admin/contenido");
    } else {
      await fs.unlink(req.file.path);
      res.render("admin/agregar", {
        layout: "admin/layout",
        error: true,
        message: "Todos los campos son requeridos",
      });
    }
  } catch (error) {
    await fs.unlink(req.file.path);
    console.log(error);
    res.render("admin/agregar", {
      layout: "admin/layout",
      error: true,
      message: "No se pudo cargar este contenido",
    });
  }
});

// ELIMINA

router.get("/eliminar/:id", async (req, res, next) => {
  var id = req.params.id;
  await contenidoModel.deleteContenidoByID(id);
  res.redirect("/admin/contenido");
});

// SELECCIONA PARA MODIFICAR

router.get("/modificar/:id", async (req, res, next) => {
  var id = req.params.id;
  var contenido = await contenidoModel.getContenidoByID(id);
  res.render("admin/modificar", {
    layout: "admin/layout",
    contenido,
  });
});

//MODIFICAR

router.post("/modificar", async (req, res, next) => {
  try {
    var obj = {
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      cuerpo: req.body.cuerpo,
      id: req.body.id,
    };
      var result = await cloudinary.uploader.upload(req.file.path);
      await contenidoModel.modificarContenidoByIDImg(
        obj,
        result.url,
        req.body.id
      );
      await fs.unlink(req.file.path);
      res.redirect("/admin/contenido");

  } catch (error) {
    await fs.unlink(req.file.path);
    console.log(error);
    res.render("admin/modificar", {
      layout: "admin/layout",
      error: true,
      message: "No se pudo modificar el contenido",
    });
  }
});

module.exports = router;
