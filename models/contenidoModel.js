var pool = require("./bd");


async function getContenido() {
  var query = "select * from contenido order by id desc";
  var rows = await pool.query(query);
  return rows;
}

async function insertContenido(obj, img) {
  try {
    var query = "insert into contenido set ?, imagen = ?";
    var rows = await pool.query(query, [obj, img]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function deleteContenidoByID(id) {
  var query = "delete from contenido where id = ?";
  var rows = await pool.query(query, [id]);
  return rows;
}

// obtener 1 contenido por ID

async function getContenidoByID(id) {
  var query = "select * from contenido where id = ?";
  var rows = await pool.query(query, [id]);
  return rows[0];
}

//modificar el contenido

async function modificarContenidoByID(obj, id) {
  try {
    var query = "update contenido set ? where id= ?";
    var rows = await pool.query(query, [obj, id]);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function modificarContenidoByIDImg(obj,img, id) {
  try {
    var query = "update contenido set ?, imagen = ? where id= ?";
    var rows = await pool.query(query, [obj,img, id]);
    return rows;
  } catch (error) {
    throw error;
  }
}

//BUSCAR

async function buscarContenido(busqueda){
  var query = 'select * from contenido where titulo like ? or subtitulo like ? or cuerpo like ?';
  var rows = await pool.query(query, ['%' + busqueda + '%' , '%' + busqueda + '%' ,'%' + busqueda + '%' ]);
  return rows;
}


module.exports = {
  getContenido,
  insertContenido,
  deleteContenidoByID,
  getContenidoByID,
  modificarContenidoByIDImg, 
  modificarContenidoByID,
  buscarContenido,
};
