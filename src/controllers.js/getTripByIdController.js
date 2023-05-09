const Joi = require("joi");


const { findTripById } = require("../repositories.js/usersRepository");
const createJsonError = require("../errors/createJsonError");
const throwJsonError = require("../errors/throwJsonError");

const schema = Joi.number().positive();

const getTripById = async (req, res) => {
  try {
    const { id } = req.params;
    await schema.validateAsync(id);
    console.log("hola");

    const trip = await findTripById(id);
    if (!trip) {
      throwJsonError(400, `No se ha encontrado resultados para el id: ${id}`);
    }

    res.status(200);
    res.send(trip);
  } catch (error) {
    createJsonError(error, res);
  }
};
module.exports = getTripById;