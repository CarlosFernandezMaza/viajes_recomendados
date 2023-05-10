const express = require("express");
const {
  controllerTrips,
  controllerTripsById,
  controllerTripsByCategory,
  controllerTripsByCity,
  controllerTripsByCityAndCategory,
  controllerRatingCity,
  controllerRatingCategory,
  controllerRatingCityCategory,
} = require("../controllers.js/trips/tripsController");
const tripsRoutes = express.Router();
const {
  deleteTripController,
} = require("../controllers.js/trips/deleteTripController");
const validateAuth = require("../middlewares/validateAuth");

//endpoints publicos
tripsRoutes.get("/", controllerTrips);
tripsRoutes.get("/:id", controllerTripsById);
tripsRoutes.get("/category/:category", controllerTripsByCategory);
tripsRoutes.get("/city/:city", controllerTripsByCity);
tripsRoutes.get(
  "/city/:city/category/:category",
  controllerTripsByCityAndCategory
);
tripsRoutes.get("/city/:city/rating", controllerRatingCity);
tripsRoutes.get("/category/:category/rating", controllerRatingCategory);
tripsRoutes.get(
  "/city/:city/category/:category/rating",
  controllerRatingCityCategory
);

//endpoints privados
tripsRoutes.delete("/trips/:id", validateAuth, deleteTripController);

module.exports = {
  tripsRoutes,
};
