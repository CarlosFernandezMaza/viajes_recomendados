const createJsonError = require("../../errors/createJsonError")
const Joi = require("joi")
const { findComentaries } = require("../../repositories.js/comentariesRepositories")

const schema = Joi.number().positive().integer()


const getComentaries = async(req, res) => {
    try {
        const {id} = req.params

        await schema.validateAsync(id)

        const comentaries = await findComentaries(id)

        res.status(200)
        res.send(comentaries)

    } catch (error) {
        createJsonError(error, res)
    }
    
}

module.exports = getComentaries