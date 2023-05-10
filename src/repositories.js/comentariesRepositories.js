const { getConnection } = require("../infraestructure/database");

const addComment = async(idUser, idTrip, commentaries, votes) => {
    const pool = await getConnection();
    const sql = `
    INSERT INTO comentaries (idUser, idTrip, commentaries, votes)
    VALUES (?, ?, ?, ?)`
    ;
    
    const [created] = await pool.query(sql, [idUser, idTrip, commentaries, votes]);

    return created.insertId;

}

module.exports = {
    addComment,
}