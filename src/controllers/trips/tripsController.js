const { findAllTrips, findTripById, findTripByCity, findTripByCategory, findTripByCityAndCategory } = require("../../repositories/tripsRepositories");

const controllerTrips = async (req, res) => {
  try {
    const trips = await findAllTrips();
    console.log('Se muestran todos los viajes')
    
    res.status(200).json(trips);
    res.send(trips)
  } catch (error) {
    console.error("error");
    res.status(500).json({ message: "Error al obtener los viajes" })
    
  }
}

const controllerTripsById = async (req, res) => {
  try {
    const {id} = req.params;


    const trip = await findTripById(id);
    res.status(200);
    res.send(trip)
    console.log("viaje encontrado por ID")
        
    } catch (error) {
      console.error("error");
      res.status(500).json({ message: "Error al obtener viajes por ID" })
    }
}

const controllerTripsByCity = async (req, res) => {
  try {
    const {city} = req.params;


    const trip = await findTripByCity(city);
    res.status(200);
    res.send(trip)
    console.log("viaje encontrado por ciudad")
        
    } catch (error) {
      console.error("error");
      res.status(500).json({ message: "Error al obtener viajes por City" })
    }
}

const controllerTripsByCategory = async (req, res) => {
  try {
    const {category} = req.params;


    const trip = await findTripByCategory(category);
    res.status(200);
    res.send(trip)
    console.log("viaje encontrado por Categoria")
        
    } catch (error) {
      console.error("error");
      res.status(500).json({ message: "Error al obtener viajes por Category" })
    }
}

const controllerTripsByCityAndCategory = async (req, res) => {
  try {
    const { city, category } = req.params;

    const trip = await findTripByCityAndCategory(city, category);
    res.status(200);
    res.send(trip)
    console.log("viaje encontrado por ciudad y categoria")
        
  } catch (error) {
    console.error("error");
    res.status(500).json({ message: "Error al obtener viajes por ciudad y categoria" })
  }
}

module.exports = {
  controllerTrips,
  controllerTripsById,
  controllerTripsByCity,
  controllerTripsByCategory,
  controllerTripsByCityAndCategory
}
  ;




  