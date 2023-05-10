const express = require("express");
const { controllerTrips, controllerTripsById, controllerTripsByCategory, controllerTripsByCity, controllerTripsByCityAndCategory, controllerRatingCity, controllerRatingCategory, controllerRatingCityCategory } = require("../controllers.js/trips/tripsController");
const createTrip = require("../controllers.js/trips/createTripController");
const tripsRoutes = express.Router();
const validateAuth = require("../middlewares/validateAuth");
const updateTripImage = require("../controllers.js/trips/updateTripImageController");


//endpoints publicos
tripsRoutes.get('/', controllerTrips);
tripsRoutes.get('/:id', controllerTripsById);
tripsRoutes.get('/category/:category', controllerTripsByCategory);
tripsRoutes.get('/city/:city', controllerTripsByCity);
tripsRoutes.get('/city/:city/category/:category', controllerTripsByCityAndCategory);
tripsRoutes.get('/city/:city/rating', controllerRatingCity);
tripsRoutes.get('/category/:category/rating', controllerRatingCategory);
tripsRoutes.get('/city/:city/category/:category/rating',controllerRatingCityCategory);

//endpoints privados
tripsRoutes.route("/").all(validateAuth).post(createTrip);
tripsRoutes.route("/upload/:id").all(validateAuth).patch(updateTripImage);


module.exports = {
    tripsRoutes
}