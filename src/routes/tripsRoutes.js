const express = require("express");
const { controllerTrips, controllerTripsById, controllerTripsByCategory, controllerTripsByCity, controllerTripsByCityAndCategory, controllerRatingCity, controllerRatingCategory, controllerRatingCityCategory } = require("../controllers.js/trips/tripsController");
const tripsRoutes = express.Router();


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




module.exports = {
    tripsRoutes
}