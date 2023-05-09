const Joi = require("joi");
const throwJsonError = require("../../errores/throwJsonError");
const createJsonError = require("../../errores/createJsonError");
const findTripById = require("../../repositories/tripsRepository");

const schema = Joi.number().integer().positive();

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
