var pool = require("./bd");

async function getContenido() {
  var query = "select * from contenido";
  var rows = await pool.query(query);
  return rows;
}

async function insertContenido(obj) {
  try {
    var query = "insert into contenido set ?";
    var rows = await pool.query(query, [obj]);
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

module.exports = {
  getContenido,
  insertContenido,
  deleteContenidoByID,
  getContenidoByID,
  modificarContenidoByID,
};
