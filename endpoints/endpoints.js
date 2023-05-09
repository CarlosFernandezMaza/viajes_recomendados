/**
 * Endpoints Públicos
Una petición GET para buscar recomendaciones por ciudad y categoría. 
Una petición GET para ordenar los resultados por votos. 
Una petición GET para ver el detalle de una recomendación. 
Una petición POST para iniciar sesión. 
Una petición POST para registrarse. 

* Endpoints privados
Una petición POST para publicar recomendaciones (este endpoint requiere autenticación). 
Una petición POST para votar las recomendaciones de otros usuarios (este endpoint también requiere autenticación). 
Una petición PUT para actualizar el perfil (se requiere autenticación). 
Una petición DELETE para borrar recomendaciones (se requiere autenticación). 
Una petición POST para publicar comentarios en las recomendaciones (se requiere autenticación).
 */

//*******************Endpoints Públicos**************************

// Endpoint público para buscar recomendaciones por ciudad y categoría
app.get("/recomendaciones", (req, res) => {
  const ciudad = req.query.ciudad;
  const categoria = req.query.categoria;

  const sql = `
      SELECT *
      FROM recomendaciones
      WHERE ciudad = ? AND categoria = ?
    `;

  connection.query(sql, [ciudad, categoria], (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta:", err);
      res.status(500).send("Error en el servidor");
      return;
    }
    res.send(results);
  });
});

// Endpoint público para ordenar resultados de búsqueda por votos
app.get("/recomendaciones/votos", (req, res) => {
  const sql = `
      SELECT r.*, COUNT(v.id) AS votos
      FROM recomendaciones r
      LEFT JOIN votos v ON r.id = v.recomendacion_id
      GROUP BY r.id
      ORDER BY votos DESC
    `;

  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta:", err);
      res.status(500).send("Error en el servidor");
      return;
    }
    res.send(results);
  });
});

// Endpoint público para ver detalle de una recomendación
app.get("/recomendaciones/:id", (req, res) => {
  const id = req.params.id;

  const sql = `
      SELECT *
      FROM recomendaciones
      WHERE id = ?
    `;

  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta:", err);
      res.status(500).send("Error en el servidor");
      return;
    }
    if (results.length === 0) {
      res.status(404).send("Recomendación no encontrada");
      return;
    }
    res.send(results[0]);
  });
});

// Endpoint público para login
app.post("/login", (req, res) => {
  const { usuario, contraseña } = req.body;

  const sql = `
      SELECT id, usuario
      FROM usuarios
      WHERE usuario = ? AND contraseña = ?
    `;

  connection.query(sql, [usuario, contraseña], (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta:", err);
      res.status(500).send("Error en el servidor");
      return;
    }
    if (results.length === 0) {
      res.status(401).send("Credenciales inválidas");
      return;
    }
    const token = generarToken(results[0]);
    res.send({ token });
  });
});

// Endpoint público para registro
app.post("/registro", (req, res) => {
  const { usuario, contraseña } = req.body;

  const sql = `
      INSERT INTO usuarios (usuario, contraseña)
      VALUES (?, ?)
    `;
  connection.query(sql, [usuario, contraseña], (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta:", err);
      res.status(500).send("Error en el servidor");
      return;
    }
    const token = generarToken({ id: results.insertId, usuario });
    res.send({ token });
  });
});

// *************************Endpoints privados***********************

// Endpoint privado para publicar recomendaciones
app.post("/recomendaciones", autenticarUsuario, (req, res) => {
  const { ciudad, categoria, nombre, descripcion } = req.body;
  const usuario_id = req.usuario.id;
  const query =
    "INSERT INTO recomendaciones (ciudad, categoria, nombre, descripcion, usuario_id) VALUES (?, ?, ?, ?, ?)";
  const values = [ciudad, categoria, nombre, descripcion, usuario_id];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error("Error al ejecutar la consulta:", error.message);
      res.status(500).send("Error en el servidor");
      return;
    }
    res.send("Recomendación publicada correctamente");
  });
});

// Endpoint privado para votar recomendaciones de otros usuarios
app.post("/recomendaciones/:id/voto", autenticarUsuario, (req, res) => {
  const id = req.params.id;

  const sql = "INSERT INTO votos (recomendacion_id, usuario_id) VALUES (?, ?)";
  connection.query(sql, [id, req.usuario.id], (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta:", err);
      res
        .status(500)
        .send(
          "Ocurrió un error en el servidor al intentar votar. Por favor, inténtalo de nuevo más tarde."
        );
      return;
    }
    res.send("Voto registrado correctamente.");
  });
});

// Endpoint privado para actualizar perfil
app.put("/perfil", autenticarUsuario, (req, res) => {
  const { nombre, correo, imagen } = req.body;
  const id = req.usuario.id;

  const sql = "UPDATE usuarios SET nombre=?, correo=?, imagen=? WHERE id=?";

  connection.query(sql, [nombre, correo, imagen, id], (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta:", err);
      return res.status(500).send("Error en el servidor");
    }
    res.send("Perfil actualizado correctamente");
  });
});

// Endpoint privado para borrar recomendaciones
app.delete("/recomendaciones/:id", autenticarUsuario, (req, res) => {
  const id = req.params.id;
  const usuario_id = req.usuario.id;

  const sql = `DELETE FROM recomendaciones WHERE id = ${id} AND usuario_id = ${usuario_id}`;

  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta:", err);
      res.status(500).send("Error en el servidor");
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).send("Recomendación no encontrada");
      return;
    }

    res.send("Recomendación borrada correctamente");
  });
});

// Endpoint privado para publicar comentarios en las recomendaciones
app.post("/recomendaciones/:id/comentarios", autenticarUsuario, (req, res) => {
  const id = req.params.id;
  const { comentario } = req.body;

  const sql =
    "INSERT INTO comentarios (recomendacion_id, usuario_id, comentario) VALUES (?, ?, ?)";
  const values = [id, req.usuario.id, comentario];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta:", err);
      res.status(500).send("Error en el servidor");
      return;
    }
    res.send("Comentario publicado correctamente");
  });
});
