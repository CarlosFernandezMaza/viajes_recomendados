const { getConnection } = require("../infraestructure/database");

const addComment = async(idUser, idTrip, commentaries, votes) => {
    const pool = await getConnection();
    const sql = `
    INSERT INTO comentaries (idUser, idTrip, comentaries)
    VALUES (?, ?, ?)`
    ;
    
    const [created] = await pool.query(sql, [idUser, idTrip, commentaries]);

    return created.insertId;

}



const findComentaries = async (id) => {
    const pool = await getConnection();
    const sql = `SELECT  * FROM db_viajes.comentaries WHERE IdTrip = ?`;
    
    const [comentaries] = await pool.query(sql, [id]);
    
    return comentaries
}
    

module.exports = {
    addComment,
    findComentaries
}