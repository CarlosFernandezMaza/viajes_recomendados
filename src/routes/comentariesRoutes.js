const express = require("express");
const validateAuth = require("../middlewares/validateAuth");
const { createComentarie, createComentarieByIdTrip } = require("../controllers.js/comentaries/comentariesController");
const comentariesRoutes = express.Router();

//endpoints privados
comentariesRoutes.route("/:id/comentaries").all(/*validateAuth*/).post(createComentarieByIdTrip);

module.exports = {
    comentariesRoutes
}
