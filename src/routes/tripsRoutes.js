const express = require("express");
const tripsRoutes = express.Router();


module.exports = {
    tripsRoutes
}const express = require('express');
const db = require('../../db');

const router = express.Router();

// Endpoint público para buscar recomendaciones por ciudad y categoría
router.get('/', async (req, res) => {
  const { city, category } = req.query;

  try {
    // Construir la consulta SQL según los parámetros de búsqueda
    let sql = 'SELECT * FROM trips';

    if (city && category) {
      sql += ' WHERE city = ? AND category = ?';
    } else if (city) {
      sql += ' WHERE city = ?';
    } else if (category) {
      sql += ' WHERE category = ?';
    }

    // Ordenar por votos de manera descendente
    sql += ' ORDER BY votes DESC';

    // Ejecutar la consulta en la base de datos
    const trips = await db.query(sql, [city, category]);

    return res.status(200).json({
      status: 'success',
      data: trips
    });
  } catch (err) {
    console.error('Error al buscar recomendaciones:', err);
    return res.status(500).json({
      status: 'error',
      message: 'Error al buscar recomendaciones'
    });
  }
});

// Endpoint público para ver detalle de una recomendación
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar la recomendación por su id
    const [trip] = await db.query('SELECT * FROM trips WHERE id = ?', [id]);

    if (!trip) {
      return res.status(404).json({
        status: 'error',
        message: 'Recomendación no encontrada'
      });
    }

    return res.status(200).json({
      status: 'success',
      data: trip
    });
  } catch (err) {
    console.error('Error al buscar la recomendación:', err);
    return res.status(500).json({
      status: 'error',
      message: 'Error al buscar la recomendación'
    });
  }
});

// Endpoint privado para publicar recomendaciones
router.post('/', async (req, res) => {
  const { IdUser, title, dateExperience, category, city, excerpt, description, image } = req.body;

  // Verificar que los campos obligatorios estén presentes
  if (!IdUser || !title || !category || !city || !excerpt) {
    return res.status(400).json({
      status: 'error',
      message: 'Faltan campos obligatorios'
    });
  }

  try {
    // Crear la recomendación en la base de datos
    await db.query(
        'INSERT INTO trips (IdUser, title, dateExperience, category, city, excerpt, description, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [IdUser, title, dateExperience, category, city, excerpt, description, image]
      );
  
      return res.status(201).json({
        status: 'success',
        message: 'Recomendación creada correctamente'
      });
    } catch (err) {
      console.error('Error al crear la recomendación:', err);
      return res.status(500).json({
        status: 'error',
        message: 'Error al crear la recomendación'
      });
    }
  });
  
  // Endpoint privado para votar recomendaciones de otros usuarios
  router.post('/:id/voto', async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
  
    // Verificar que el usuario haya proporcionado un ID de usuario válido
    if (!userId) {
      return res.status(400).json({
        status: 'error',
        message: 'Falta el ID de usuario'
      });
    }
  
    try {
      // Verificar que la recomendación exista
      const [trip] = await db.query('SELECT * FROM trips WHERE id = ?', [id]);
  
      if (!trip) {
        return res.status(404).json({
          status: 'error',
          message: 'Recomendación no encontrada'
        });
      }
  
      // Verificar si el usuario ya ha votado la recomendación
      const [existingVote] = await db.query('SELECT * FROM votes WHERE userId = ? AND tripId = ?', [userId, id]);
  
      if (existingVote) {
        return res.status(400).json({
          status: 'error',
          message: 'El usuario ya ha votado esta recomendación'
        });
      }
  
      // Agregar el voto a la base de datos
      await db.query('INSERT INTO votes (userId, tripId) VALUES (?, ?)', [userId, id]);
  
      // Incrementar el número de votos en la recomendación
      await db.query('UPDATE trips SET votes = votes + 1 WHERE id = ?', [id]);
  
      return res.status(201).json({
        status: 'success',
        message: 'Voto agregado correctamente'
      });
    } catch (err) {
      console.error('Error al votar la recomendación:', err);
      return res.status(500).json({
        status: 'error',
        message: 'Error al votar la recomendación'
      });
    }
  });
  
  // Endpoint privado para borrar recomendaciones
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      // Borrar la recomendación de la base de datos
      await db.query('DELETE FROM trips WHERE id = ?', [id]);
  
      return res.status(200).json({
        status: 'success',
        message: 'Recomendación borrada correctamente'
      });
    } catch (err) {
      console.error('Error al borrar la recomendación:', err);
      return res.status(500).json({
        status: 'error',
        message: 'Error al borrar la recomendación'
      });
    }
  });
  
  module.exports = {
    router
  };
  
