const Joi = require("joi");
const createJsonError = require("../../errors/createJsonError");
const { findTripById } = require("../../repositories.js/usersRepository");
const throwJsonError = require("../../errors/throwJsonError");
const { addComment } = require("../../repositories.js/comentariesRepositories");

const schema = Joi.number().positive().required();
const schemaBody = Joi.object().keys({
    commentaries: Joi.string().min(10).max(500),
    vote: Joi.boolean()
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
        const {comentaries, vote} = body;
        
        const commentId = await addComment(id, idTrip, comentaries, vote);
        console.log('Se crean comentarios')
    
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