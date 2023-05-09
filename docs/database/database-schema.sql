CREATE DATABASE IF NOT EXISTS db_viajes;
USE db_viajes;

DROP TABLE IF EXISTS comentarios;
DROP TABLE IF EXISTS recomendaciones;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS votos;

CREATE TABLE usuarios(
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  usuario VARCHAR(100) UNIQUE NOT NULL,
  correo VARCHAR(200) NOT NULL,
  contraseña VARCHAR(128) NOT NULL,
  creado_en DATETIME NULL DEFAULT NULL,
  rol ENUM("admin","usuario") NULL DEFAULT "usuario",
  imagen VARCHAR(100) NULL DEFAULT NULL,
  codigo_verificacion VARCHAR(100) NULL DEFAULT NULL,
  biografia TEXT NULL DEFAULT NULL
);

CREATE TABLE recomendaciones(
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT UNSIGNED NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT NULL DEFAULT NULL,
  ciudad VARCHAR(200) NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  votos INT NULL DEFAULT NULL,
  imagen VARCHAR(100) NULL DEFAULT NULL,    
  FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
  ON DELETE CASCADE
);

CREATE TABLE comentarios(
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT UNSIGNED NOT NULL,
  recomendacion_id INT UNSIGNED NOT NULL,
  comentario TEXT NOT NULL,
  votos BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
  ON DELETE CASCADE,
  FOREIGN KEY(recomendacion_id) REFERENCES recomendaciones(id)
  ON DELETE CASCADE
);

CREATE TABLE votos(
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT UNSIGNED NOT NULL,
  recomendacion_id INT UNSIGNED NOT NULL,
  FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
  ON DELETE CASCADE,
  FOREIGN KEY(recomendacion_id) REFERENCES recomendaciones(id)
  ON DELETE CASCADE
);
