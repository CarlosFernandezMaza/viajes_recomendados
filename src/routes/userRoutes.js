const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../db");

const router = express.Router();

// Endpoint público para registro
router.post("/registro", async (req, res) => {
  const { name, lastname, user_name, email, password } = req.body;

  // Verificar que los campos obligatorios estén presentes
  if (!name || !lastname || !user_name || !email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Faltan campos obligatorios",
    });
  }

  try {
    // Verificar si el usuario ya existe
    const userExists = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (userExists.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "El usuario ya existe",
      });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario en la base de datos
    await db.query(
      "INSERT INTO users (name, lastname, user_name, email, password) VALUES (?, ?, ?, ?, ?)",
      [name, lastname, user_name, email, hashedPassword]
    );

    return res.status(201).json({
      status: "success",
      message: "Usuario creado correctamente",
    });
  } catch (err) {
    console.error("Error al crear el usuario:", err);
    return res.status(500).json({
      status: "error",
      message: "Error al crear el usuario",
    });
  }
});

// Endpoint público para login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Verificar que los campos obligatorios estén presentes
  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Faltan campos obligatorios",
    });
  }

  try {
    // Buscar el usuario por su correo electrónico
    const [user] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    // Si el usuario no existe, devolver un error
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "El usuario no existe",
      });
    }

    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        status: "error",
        message: "Credenciales inválidas",
      });
    }

    // Crear un token de sesión para el usuario
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    // Devolver el token al usuario
    return res.status(200).json({
      status: "success",
      message: "Inicio de sesión exitoso",
      token,
    });
  } catch (err) {
    console.error("Error al iniciar sesión:", err);
    return res.status(500).json({
      status: "error",
      message: "Error al iniciar sesión",
    });
  }
});

module.exports = {
  router,
};
