const express = require("express");
const db = require("../../db");

const router = express.Router();

// Endpoint privado para publicar comentarios en las recomendaciones
router.post("/", async (req, res) => {
  const { IdUser, IdTrip, comentaries } = req.body;

  // Verificar que los campos obligatorios estén presentes
  if (!IdUser || !IdTrip || !comentaries) {
    return res.status(400).json({
      status: "error",
      message: "Faltan campos obligatorios",
    });
  }

  try {
    // Verificar que la recomendación exista
    const [trip] = await db.query("SELECT * FROM trips WHERE id = ?", [IdTrip]);

    if (!trip) {
      return res.status(404).json({
        status: "error",
        message: "Recomendación no encontrada",
      });
    }

    // Crear el comentario en la base de datos
    await db.query(
      "INSERT INTO comentaries (IdUser, IdTrip, comentaries) VALUES (?, ?, ?)",
      [IdUser, IdTrip, comentaries]
    );

    return res.status(201).json({
      status: "success",
      message: "Comentario publicado correctamente",
    });
  } catch (err) {
    console.error("Error al publicar el comentario:", err);
    return res.status(500).json({
      status: "error",
      message: "Error al publicar el comentario",
    });
  }
});

module.exports = {
  router,
};
