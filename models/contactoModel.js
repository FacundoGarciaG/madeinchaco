var pool = require("./bd");

async function insertContacto(obj) {
    try {
      var query = "insert into contacto set ?";
      var rows = await pool.query(query, [obj]);
      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async function getContacto() {
    var query = "select * from contacto order by id desc";
    var rows = await pool.query(query);
    return rows;
  } 

  async function buscarContacto(busqueda){
    var query = 'select * from contacto where nombre like ? or apellido like ? or telefono like ? or email like ? or comentarios like ?';
    var rows = await pool.query(query, ['%' + busqueda + '%' , '%' + busqueda + '%' ,'%' + busqueda + '%', '%' + busqueda + '%', '%' + busqueda + '%' ]);
    return rows;
  }

  async function deleteContactoByID(id) {
    var query = "delete from contacto where id = ?";
    var rows = await pool.query(query, [id]);
    return rows;
  }
/* 
  async function mostrarContactoId(id) {
    var query = "select mensaje from contacto where id = ?";
    var rows = await pool.query(query, [id]);
    return rows;
  } */

  module.exports = {
      insertContacto,
      getContacto,
      buscarContacto,
      deleteContactoByID,
     /*  mostrarContactoId */
  }
   