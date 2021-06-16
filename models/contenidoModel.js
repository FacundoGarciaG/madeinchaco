var pool = require('./bd');

async function getContenido () {
    var query = 'select * from contenido';
    var rows = await pool.query(query);
    return rows;
}

module.exports = { getContenido }