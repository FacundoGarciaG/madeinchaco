var pool = require('./bd');

async function getContenido () {
    var query = 'select * from contenido';
    var rows = await pool.query(query);
    return rows;
}

async function insertContenido(obj){
    try {
        var query = 'insert into contenido set ?';
        var rows = await pool.query(query, [obj]);
        return rows;
    }catch(error){
        console.log(error);
        throw error;
    }
}

async function deleteContenidoByID(id){
    var query = 'delete from contenido where id = ?'
    var rows = await pool.query(query, [id]);
    return rows;
}

module.exports = { getContenido, insertContenido, deleteContenidoByID }