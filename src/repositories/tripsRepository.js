const { getConnection } = require("../infraestructure/database.js");
const findTripById = async (id) => {
  const pool = await getConnection();
  const sql =
    "SELECT user_name ,title, trips.createAt, dateExperience, category, city, description, votes, trips.image FROM db_viajes.trips join users on users.id = trips.IdUser where trips.id = ?";

  const [trip] = await pool.query(sql, id);
  return trip[0];
};

module.exports = findTripById;
