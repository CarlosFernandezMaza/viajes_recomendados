const Joi = require("joi");
const { findAllTrips, findTripById, findTripByCity, findTripByCategory, findTripByCityAndCategory, TripsOrderByVotes, TripsCityOrderByVotes, tripsCityOrderByVotes, tripsCategoryOrderByVotes, tripsCityCategoryOrderByVotes } = require("../../repositories/tripsRepositories");
const throwJsonError = require("../../error/throwJsonError");
const createJsonError = require("../../error/createJsonError");

const schemaId = Joi.number().integer().positive();
const schemaParameter = Joi.string().min(2).max(50);

const controllerTrips = async (req, res) => {
  try {
    const trips = await findAllTrips();
    if (!trips) {
      throwJsonError(400, `No se han encontrado viajes por en la base de datos`)
    }
    
    console.log('Se muestran todos los viajes')
    
    res.status(200);
    res.send(trips)
  } catch (error) {
    console.error("error");
    createJsonError(error, res)
    
  }
}

const controllerTripsById = async (req, res) => {
  try {
    const {id} = req.params;
    await schemaId.validateAsync(id);

    const trip = await findTripById(id);
    if (!trip) {
      throwJsonError(400, `No se han encontrado viajes por la ID:${id}`)
    }
    res.status(200);
    res.send(trip)
    console.log("viaje encontrado por ID")
        
    } catch (error) {
      console.error("error");
      createJsonError(error, res)
    }
}

const controllerTripsByCity = async (req, res) => {
  try {
    const {city} = req.params;
    await schemaParameter.validateAsync(city);

    const trip = await findTripByCity(city);
    if (!trip) {
      throwJsonError(400, `No se han encontrado viajes por la ciudad: ${city}`)
    }
    res.status(200);
    res.send(trip)
    console.log("viaje encontrado por ciudad")
        
    } catch (error) {
      console.error("error");
      createJsonError(error, res)
    }
}

const controllerTripsByCategory = async (req, res) => {
  try {
    const {category} = req.params;
    await schemaParameter.validateAsync(category);

    const trip = await findTripByCategory(category);
    if (!trip) {
      throwJsonError(400, `No se han encontrado viajes por la categoria: ${category}`)
    }
    res.status(200);
    res.send(trip)
    console.log("viaje encontrado por Categoria")
        
    } catch (error) {
      console.error("error");
      createJsonError(error, res)
    }
}

const controllerTripsByCityAndCategory = async (req, res) => {
  try {
    const { city, category } = req.params;
    await schemaParameter.validateAsync(city, category);

    const trip = await findTripByCityAndCategory(city, category);
    if (!trip) {
      throwJsonError(400, `No se han encontrado viajes en la ciudad: ${city} por la categoría ${category}`)
    }
    res.status(200);
    res.send(trip)
    console.log("viaje encontrado por ciudad y categoria")
        
  } catch (error) {
    console.error("error");
    createJsonError(error, res)
  }
}

const controllerRatingCity = async (req, res) => {
  try {
    const { city } = req.params;
    await schemaParameter.validateAsync(city);

    const trip = await tripsCityOrderByVotes(city);
    if (!trip) {
      throwJsonError(400, `No se han encontrado viajes en la ciudad: ${city}`)
    }
    res.status(200);
    res.send(trip)
    console.log("Rating de viajes por ciudad descendiente")
        
  } catch (error) {
    console.error("error");
    createJsonError(error, res)
  }
}

const controllerRatingCategory = async (req, res) => {
  try {
    const { category } = req.params;
    await schemaParameter.validateAsync(category);

    const trip = await tripsCategoryOrderByVotes(category);
    if (!trip) {
      throwJsonError(400, `No se han encontrado viajes en la categoría ${category}`)
    }
    res.status(200);
    res.send(trip)
    console.log("viaje encontrado por ciudad y categoria")
        
  } catch (error) {
    console.error("error");
    createJsonError(error, res)
  }
}

const controllerRatingCityCategory = async (req, res) => {
  try {
    const { city, category } = req.params;
    await schemaParameter.validateAsync(city, category);

    const trip = await tripsCityCategoryOrderByVotes(city, category);
    if (!trip) {
      throwJsonError(400, `No se han encontrado viajes en la ciudad: ${city} por la categoría ${category}`)
    }
    res.status(200);
    res.send(trip)
    console.log("viaje encontrado por ciudad y categoria")
        
  } catch (error) {
    console.error("error");
    createJsonError(error, res)
  }
}

module.exports = {
  controllerTrips,
  controllerTripsById,
  controllerTripsByCity,
  controllerTripsByCategory,
  controllerTripsByCityAndCategory,
  controllerRatingCity,
  controllerRatingCategory, 
  controllerRatingCityCategory
}
  ;




  