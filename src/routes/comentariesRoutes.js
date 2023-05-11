const express = require("express");
const comentariesRoutes = express.Router();
const validateAuth = require("../middlewares/validateAuth");
const { createComentarieByIdTrip } = require("../controllers.js/comentaries/comentariesController");
const getComentaries = require("../controllers.js/comentaries/getComentariesController");

comentariesRoutes.route("/:id").all(validateAuth).post(createComentarieByIdTrip);
comentariesRoutes.route("/:id").all(validateAuth).get(getComentaries);

module.exports = {
    comentariesRoutes
}
