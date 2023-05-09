const express = require("express");
const { controllerTrips, controllerTripsById, controllerTripsByCity, controllerTripsByCategory, controllerTripsByCityAndCategory } = require("../controllers/trips/tripsController");
const tripsRoutes = express.Router();

//endpoints publicos
tripsRoutes.get('/', controllerTrips);
tripsRoutes.get('/:id', controllerTripsById);
tripsRoutes.get('/category/:category', controllerTripsByCategory);
tripsRoutes.get('/city/:city', controllerTripsByCity);
tripsRoutes.get('/city/:city/category/:category', controllerTripsByCityAndCategory)


module.exports = {
    tripsRoutes
}