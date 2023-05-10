INSERT INTO users (name, lastname, user_name, email, password, createAt, role, image, verificationCode, bio)
VALUES 
("Usuario1", "Apellido1", "usuario1", "usuario1@example.com", "contraseña1", NOW(), "user", NULL, NULL, NULL),
("Usuario2", "Apellido2", "usuario2", "usuario2@example.com", "contraseña2", NOW(), "user", NULL, NULL, NULL),
("Usuario3", "Apellido3", "usuario3", "usuario3@example.com", "contraseña3", NOW(), "user", NULL, NULL, NULL),
("Usuario4", "Apellido4", "usuario4", "usuario4@example.com", "contraseña4", NOW(), "user", NULL, NULL, NULL),
("Usuario5", "Apellido5", "usuario5", "usuario5@example.com", "contraseña5", NOW(), "user", NULL, NULL, NULL);



INSERT INTO trips (idUser, title, createAt, dateExperience, category, city, excerpt, description, votes, image)
VALUES

    (1, "Vacaciones en Familia", NOW(), "2023-06-15", "viaje-familiar", "Madrid", "Diviértete en familia en Madrid", "Disfruta de las vacaciones en familia en la capital española.", FLOOR(RAND()*(100-10+1))+10, "https://viajes.com/madrid-vacaciones-familia.jpg"),
    (2, "Aventuras Familiares en la Costa", NOW(), "2023-07-20", "viaje-familiar", "Barcelona", "Aventuras para toda la familia", "Ven y disfruta de las actividades al aire libre en la costa mediterránea de Barcelona.", FLOOR(RAND()*(100-10+1))+10, "https://viajes.com/barcelona-aventuras-familia.jpg"),
    (3, "Familia en la Playa", NOW(), "2023-08-01", "viaje-familiar", "Valencia", "Relájate con tu familia en la playa", "Disfruta de la playa y el sol en Valencia en compañía de tu familia.", FLOOR(RAND()*(100-10+1))+10, "https://viajes.com/valencia-familia-playa.jpg"),
    (4, "Viaje de Negocios en Madrid", NOW(), "2023-09-15", "viaje-negocios", "Madrid", "Viaje de negocios en la capital española", "Aprovecha tu viaje de negocios en Madrid para conocer la ciudad y hacer contactos importantes.", FLOOR(RAND()*(100-10+1))+10, "https://viajes.com/madrid-viaje-negocios.jpg"),
    (5, "Citas de Negocios en Barcelona", NOW(), "2023-10-20", "viaje-negocios", "Barcelona", "Haz negocios en la Ciudad Condal", "Aprovecha tus citas de negocios en Barcelona para conocer la ciudad y sus encantos.", FLOOR(RAND()*(100-10+1))+10, "https://viajes.com/barcelona-citas-negocios.jpg"),
    (6, "Turismo de Negocios en Valencia", NOW(), "2023-11-01", "viaje-negocios", "Valencia", "Descubre Valencia en tu viaje de negocios", "Aprovecha tu viaje de negocios en Valencia para conocer la ciudad y disfrutar de sus atractivos turísticos.", FLOOR(RAND()*(100-10+1))+10, "https://viajes.com/valencia-turismo-negocios.jpg"),
    (7, "Tour de Arte en Madrid", NOW(), "2023-12-15", "viaje-cultural", "Madrid", "Descubre la riqueza cultural de Madrid", "Visita los principales museos y galerías de arte de Madrid en este tour cultural.", FLOOR(RAND()*(100-10+1))+10, "https://viajes.com/madrid-tour-arte.jpg"),

