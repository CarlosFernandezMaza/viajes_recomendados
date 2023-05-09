const mysql = require("mysql2/promise");

const { MYSQL_HOST, MYSQL_USER, MYSQL_PORT, MYSQL_PASSWORD, MYSQL_DATABASE } =
  process.env;

const pool = mysql.createPool({
  connectionLimit: 10,
  host: MYSQL_HOST,
  user: MYSQL_USER,
  port: MYSQL_PORT,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  timezone: "Z",
});

const query = async function (sql, values) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query(sql, values);
    return rows;
  } catch (err) {
    console.error("Error al ejecutar la consulta:", err);
    throw err;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

module.exports = {
  query,
};
