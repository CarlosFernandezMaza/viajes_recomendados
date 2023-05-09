const express = require("express");
const getTripById = require("../controllers.js/getTripByIdController");
const tripsRoutes = express.Router();


tripsRoutes.get("/:id", getTripById)

module.exports = {
    tripsRoutes
}