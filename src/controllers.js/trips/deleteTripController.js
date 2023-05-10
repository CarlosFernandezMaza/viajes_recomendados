const { deleteTrip } = require("../repositories/tripsRepositories");

const deleteTripController = async (req, res) => {
  try {
    const { id } = req.params;
    const { auth } = req;

    const trip = await deleteTrip(id, auth.id);

    if (!trip) {
      return res.status(404).json({ message: "Recomendación no encontrada" });
    }

    return res
      .status(200)
      .json({ message: "Recomendación borrada correctamente" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  deleteTripController,
};
