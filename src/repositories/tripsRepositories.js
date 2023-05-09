const { getConnection } = require("../infraestructure/database");




const findAllTrips = async() => {

const pool = await getConnection();
  const sql = `SELECT * FROM trips`;
  const [trips] = await pool.query(sql);

  return { trips };

  }
  

module.exports = {
findAllTrips

}

const findTripById = async (ID) => {
  const pool = await getConnection();
  const sql = `SELECT * FROM trips WHERE ID = ?`;
  const [trips] = await pool.query(sql, [ID]);

  return trips[0];
};

const findTripByCity = async (city) => {
  const pool = await getConnection();
  const sql = `SELECT * FROM trips WHERE city = ?`;
  const [trips] = await pool.query(sql, [city]);

  return trips[0];
};

const findTripByCategory = async (category) => {
  const pool = await getConnection();
  const sql = `SELECT * FROM trips WHERE category = ?`;
  const [trips] = await pool.query(sql, [category]);

  return trips[0];
};


const findTripByCityAndCategory = async (city, category) => {
  const pool = await getConnection();
  const sql = `SELECT * FROM trips WHERE city = ? AND category = ?`;
  const [trips] = await pool.query(sql, [city, category]);

  return trips[0];
};
    
  
  module.exports = {
  findAllTrips,
  findTripById,
  findTripByCity,
  findTripByCategory,
  findTripByCityAndCategory
  
  }
