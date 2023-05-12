const createJsonError = require("../../errors/createJsonError")
const Joi = require("joi")
const { findComentaries } = require("../../repositories.js/comentariesRepositories")
const throwJsonError = require("../../errors/throwJsonError")

const schema = Joi.number().positive().integer()


const getComentaries = async(req, res) => {
    try {
        const {id} = req.params

        await schema.validateAsync(id)

        const comentaries = await findComentaries(id)

        if(comentaries.length === 0){
            throwJsonError(400, "Todavia no hay comentarios para este viaje")
        }

        res.status(200)
        res.send(comentaries)

    } catch (error) {
        createJsonError(error, res)
    }
    
}

module.exports = getComentaries