const { getConnection } = require("../infraestructure/database");




const findAllTrips = async() => {

const pool = await getConnection();
  const sql = `SELECT * FROM trips`;
  const [trips] = await pool.query(sql);

  return { trips };

  }
  

const findTripById = async (ID) => {
  const pool = await getConnection();
  const sql = `SELECT * FROM trips WHERE ID = ?`;
  const [trips] = await pool.query(sql, [ID]);

  return trips[0];
};


const findUserIdInTrip = async (idTrip) => {
  const pool = await getConnection();
  const sql = `SELECT  users.id FROM db_viajes.trips join users on users.id = trips.IdUser where trips.id = ?`;
  const [id] = await pool.query(sql, [idTrip]);

  return id;
}

const findTripByCity = async (city) => {
  const pool = await getConnection();
  const sql = `SELECT * FROM trips WHERE city = ?`;
  const [trips] = await pool.query(sql, [city]);

  return trips;
};

const findTripByCategory = async (category) => {
  const pool = await getConnection();
  const sql = `SELECT * FROM trips WHERE category = ?`;
  const [trips] = await pool.query(sql, [category]);

  return trips;
};


const findTripByCityAndCategory = async (city, category) => {
  const pool = await getConnection();
  const sql = `SELECT * FROM trips WHERE city = ? AND category = ?`;
  const [trips] = await pool.query(sql, [city, category]);

  return trips;
};



const tripsCityOrderByVotes = async (city) => {
  const pool = await getConnection();
  const sql = `SELECT * FROM trips WHERE city = ? ORDER BY votes DESC;`;
  const [trips] = await pool.query(sql, [city]);

  return trips;

};

const tripsCategoryOrderByVotes = async (category) => {
  const pool = await getConnection();
  const sql = `SELECT * FROM trips WHERE category = ? ORDER BY votes DESC;`;
  const [trips] = await pool.query(sql, [category]);

  return trips;

};

const tripsCityCategoryOrderByVotes = async (city, category) => {
  const pool = await getConnection();
  const sql = `SELECT * FROM trips WHERE city = ? AND category = ? ORDER BY votes DESC;`;
  const [trips] = await pool.query(sql, [city, category]);

  return trips;

};

const addTrip = async(body, id) => {

  const {title, dateExperience, category, city, excerpt, description} = body;
  const now = new Date();

  const pool = await getConnection();
  const sql = `INSERT INTO TRIPS (idUser, title, createAt, dateExperience,  category, city, excerpt, description)VALUES(?,?,?,?,?,?,?,?)`
  const [trip] = await pool.query(sql, [id, title, now, dateExperience, category, city, excerpt, description ]);
      return trip.insertId;
}

const addimage = async (imageName, idTrip) => {
  const pool = await getConnection();
  const sql = `UPDATE trips SET image = ? WHERE id = ?`
  const [trip] = await pool.query(sql, [imageName, idTrip ]);
      return trip.insertId;
}

const deleteTrip = async (id, userId) => {
  const pool = await getConnection();
  const [trip] = await pool.query(`SELECT * FROM trips WHERE id = ?`, [id]);

  if (trip.length === 0) {
    return null;
  }
  
  
  if (trip[0].IdUser !== userId) {
    throw new Error("No estás autorizado para borrar esta recomendación");
  }

  const [result] = await pool.query(`DELETE FROM trips WHERE id = ?`, [id]);

  if (result.affectedRows !== 1) {
    throw new Error("Error al borrar la recomendación");
  }

  return trip[0];
};


  module.exports = {
  findAllTrips,
  findTripById,
  findTripByCity,
  findTripByCategory,
  findTripByCityAndCategory,
  tripsCategoryOrderByVotes,
  tripsCityOrderByVotes,
  tripsCityCategoryOrderByVotes,
  addTrip,
  addimage,
  findUserIdInTrip,
  deleteTrip
  
  }
