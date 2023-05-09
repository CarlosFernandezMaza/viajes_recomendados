const express = require("express");
const getTripById = require("../controllers/trips/getTripByIdController");
const tripsRoutes = express.Router();

tripsRoutes.get("/:id", getTripById);

module.exports = {
  tripsRoutes,
};
