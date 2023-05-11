const { getConnection } = require("../infraestructure/database");

const addComment = async(idUser, idTrip, commentaries, votes) => {
    const pool = await getConnection();
    const sql = `
    INSERT INTO comentaries (idUser, idTrip, comentaries, votes)
    VALUES (?, ?, ?, ?)`
    ;
    
    const [created] = await pool.query(sql, [idUser, idTrip, commentaries, votes]);

    return created.insertId;

}

const alreadyVote = async (id, idTrip) =>{
    const pool = await getConnection();
    const sql = `SELECT  * FROM db_viajes.comentaries WHERE votes = true AND IdTrip = ? AND IdUser = ?`;
    
    const [voted] = await pool.query(sql, [idTrip, id]);
    if(voted.length === 0){
        console.log(false)
        return false;
    
    }
    console.log(true)
    return true;
}


const findComentaries = async (id) => {
    const pool = await getConnection();
    const sql = `SELECT  * FROM db_viajes.comentaries WHERE IdTrip = ?`;
    
    const [comentaries] = await pool.query(sql, [id]);
    
    return comentaries
}
    

module.exports = {
    addComment,
    alreadyVote, 
    findComentaries
}