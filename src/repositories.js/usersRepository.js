const {getConnection} = require("../infraestructure/database.js")

const findUserByEmail = async (email) => {

    const pool = await getConnection();
    const sql = `SELECT id, name, lastname, user_name, email, password, createAt, role, image, verificationCode  FROM users WHERE email = ?`
    const [user] = await pool.query(sql, email);

    return user[0];

}

const createUser = async (userDB) => {

    const { name, lastname, user_name, email, passwordHash, verificationCode} = userDB 

    const pool = await getConnection();
    const sql = `INSERT INTO USERS (name, lastname, user_name, email, password, verificationCode) VALUES ( ?, ?, ?, ?, ?, ?);`
    const [created] = await pool.query(sql, [name, lastname, user_name, email, passwordHash, verificationCode]);

    return created.insertId;

}

const findUserByCode = async (code) => {

    const pool = await getConnection();
    const sql = `SELECT * FROM users where verificationCode = ?`
    const [user] = await pool.query(sql, [code]);

    return user[0];
}

const activateUserByCode = async (code) => {
    const now = new Date()
    const pool = await getConnection();
    const sql = `UPDATE users SET createAt = ? WHERE verificationCode = ?`
    const [user] = await pool.query(sql, [now,code]);

    return true;
}

const findTripById = async (id) => {
    const pool = await getConnection();
    const sql =
      "SELECT user_name ,title, trips.createAt, dateExperience, category, city, description, votes, trips.image FROM db_viajes.trips join users on users.id = trips.IdUser where trips.id = ?";
  
    const [trip] = await pool.query(sql, id);
    return trip[0];
  };


module.exports = {findUserByEmail, createUser, findUserByCode, activateUserByCode, findTripById};