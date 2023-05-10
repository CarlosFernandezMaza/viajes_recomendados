const {getConnection} = require("../infraestructure/database.js")

const findUserByEmail = async (email) => {

    const pool = await getConnection();
    const sql = `SELECT id, name, lastname, user_name, email, password, createAt, role, image, verificationCode  FROM users WHERE email = ?`
    const [user] = await pool.query(sql, email);

    return user[0];

}

const findUserById = async(id) => {
    const pool = await getConnection();
    const sql = `SELECT user_name, email, createAt, image, bio FROM users WHERE id = ?`
    const [user] = await pool.query(sql, id);

    return user[0];

}

const createUser = async (userDB) => {

    const { name, lastname, user_name, email, passwordHash, verificationCode, bio} = userDB 

    const pool = await getConnection();
    const sql = `INSERT INTO USERS (name, lastname, user_name, email, password, verificationCode, bio) VALUES ( ?, ?, ?, ?, ?, ?, ?);`
    const [created] = await pool.query(sql, [name, lastname, user_name, email, passwordHash, verificationCode, bio]);

    return created.insertId;

}

const newProfile = async (userData, id) => {
    const { name, lastname, user_name, passwordHash, bio } = userData;
    console.log(userData)
    const pool = await getConnection();
    const sql = `UPDATE users SET name=?, lastname=?, user_name=?, password=?, bio=? WHERE id = ?`;
    const [created] = await pool.query(sql, [
      name,
      lastname,
      user_name,
      passwordHash,
      bio,
      id
    ]);
    
    return created.affectedRows;
  };

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

  const addAvatarimage = async (imageName, id) => {
    const pool = await getConnection();
    const sql = `UPDATE users SET image = ? WHERE id = ?`
    const [user] = await pool.query(sql, [imageName, id ]);
        return user.insertId;
  }


module.exports = {findUserByEmail, createUser, findUserByCode, activateUserByCode, findTripById, findUserById, newProfile, addAvatarimage};