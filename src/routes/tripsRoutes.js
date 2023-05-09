const express = require("express");
const { controllerTrips, controllerTripsById, controllerTripsByCity, controllerTripsByCategory, controllerTripsByCityAndCategory, controllerRatingCity, controllerRatingCategory, controllerRatingCityCategory } = require("../controllers/trips/tripsController");
const tripsRoutes = express.Router();

//endpoints publicos
tripsRoutes.get('/', controllerTrips);
tripsRoutes.get('/:id', controllerTripsById);
tripsRoutes.get('/category/:category', controllerTripsByCategory);
tripsRoutes.get('/city/:city', controllerTripsByCity);
tripsRoutes.get('/city/:city/category/:category', controllerTripsByCityAndCategory);
tripsRoutes.get('/city/:city/rating', controllerRatingCity);
tripsRoutes.get('/category/:category/rating', controllerRatingCategory);
tripsRoutes.get('/city/:city/category/:category/rating',controllerRatingCityCategory );


module.exports = {
    tripsRoutes
}