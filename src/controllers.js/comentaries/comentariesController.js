const Joi = require("joi");
const createJsonError = require("../../errors/createJsonError");
const { findTripById } = require("../../repositories.js/usersRepository");
const throwJsonError = require("../../errors/throwJsonError");
const { addComment } = require("../../repositories.js/comentariesRepositories");

const schema = Joi.number().positive().required();
const schemaBody = Joi.object().keys({
    comentaries: Joi.string().min(10).max(500),
    vote: Joi.number().integer().min(0).max(1)
})

const createComentarieByIdTrip = async (req, res) => {
    try {
        const { id } = req.auth;
        const {id: idTrip} = req.params;
        await schema.validateAsync(idTrip);
        const { body } = req;
        await schemaBody.validateAsync(body);
        const trip = findTripById(id);
        if(!trip) {
         throwJsonError(400, "Viaje no existe");
        }

        let {comentaries, vote} = body;

        /* if(vote === 1){
                update comentaries set votes = 1 where iduser = id and idtrip = idtrip
        }else{
                update comentaries set votes = 0 where iduser = id and idtrip = idtrip
        } */

        const commentId = await addComment(id, idTrip, comentaries, vote);
        console.log('Se crean comentarios')

        //actualizar tabla de trips sumando todos los votos
        // UPDATE db_viajes.TRIPS SET votes = (SELECT count(distinct IdUser) FROM db_viajes.comentaries WHERE votes = true AND IdTrip = 63) WHERE id = 63 ;
    
    res.status(200)
    res.send({commentId})
    } catch (error) {
        console.error("error");
        createJsonError(error, res)
    }
}

module.exports = {
    createComentarieByIdTrip,
}