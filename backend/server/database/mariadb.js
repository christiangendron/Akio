const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    connectionLimit: 5
});

async function query(query, values) {
    let conn;

    try {
        conn = await pool.getConnection();
        return await conn.query(query, values);
    } catch (err) {
        return 'An error occurred...';
    } finally {
        if (conn) await conn.release();
    }
}

module.exports = query;