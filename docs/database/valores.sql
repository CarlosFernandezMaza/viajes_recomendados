USE db_viajes;

INSERT INTO users (name, lastname, user_name, email, password, createAt, role, image, verificationCode, bio)
VALUES 
("Usuario1", "Apellido1", "usuario1", "usuario1@example.com", "contraseña1", NOW(), "user", NULL, NULL, NULL),
("Usuario2", "Apellido2", "usuario2", "usuario2@example.com", "contraseña2", NOW(), "user", NULL, NULL, NULL),
("Usuario3", "Apellido3", "usuario3", "usuario3@example.com", "contraseña3", NOW(), "user", NULL, NULL, NULL),
("Usuario4", "Apellido4", "usuario4", "usuario4@example.com", "contraseña4", NOW(), "user", NULL, NULL, NULL),
("Usuario5", "Apellido5", "usuario5", "usuario5@example.com", "contraseña5", NOW(), "user", NULL, NULL, NULL);

USE db_viajes;
INSERT INTO trips (idUser, title, createAt, dateExperience, category, city, excerpt, description, votes, image)
VALUES
    (1, "Vacaciones en Familia", NOW(), "2023-06-15", "viaje-familiar", "Madrid", "Diviértete en familia en Madrid", "Disfruta de las vacaciones en familia en la capital española.", 32, "https://viajes.com/madrid-vacaciones-familia.jpg"),
    (2, "Aventuras Familiares en la Costa", NOW(), "2023-07-20", "viaje-familiar", "Barcelona", "Aventuras para toda la familia", "Ven y disfruta de las actividades al aire libre en la costa mediterránea de Barcelona.", 42, "https://viajes.com/barcelona-aventuras-familia.jpg"),
    (3, "Familia en la Playa", NOW(), "2023-08-01", "viaje-familiar", "Valencia", "Relájate con tu familia en la playa", "Disfruta de la playa y el sol en Valencia en compañía de tu familia.", 43, "https://viajes.com/valencia-familia-playa.jpg"),
    (1, "Viaje de Negocios en Madrid", NOW(), "2023-09-15", "viaje-negocios", "Madrid", "Viaje de negocios en la capital española", "Aprovecha tu viaje de negocios en Madrid para conocer la ciudad y hacer contactos importantes.", 88, "https://viajes.com/madrid-viaje-negocios.jpg"),
    (2, "Citas de Negocios en Barcelona", NOW(), "2023-10-20", "viaje-negocios", "Barcelona", "Haz negocios en la Ciudad Condal", "Aprovecha tus citas de negocios en Barcelona para conocer la ciudad y sus encantos.", 3, "https://viajes.com/barcelona-citas-negocios.jpg"),
    (3, "Turismo de Negocios en Valencia", NOW(), "2023-11-01", "viaje-negocios", "Valencia", "Descubre Valencia en tu viaje de negocios", "Aprovecha tu viaje de negocios en Valencia para conocer la ciudad y disfrutar de sus atractivos turísticos.", 31, "https://viajes.com/valencia-turismo-negocios.jpg"),
    (4, "Tour de Arte en Madrid", NOW(), "2023-12-15", "viaje-cultural", "Madrid", "Descubre la riqueza cultural de Madrid", "Visita los principales museos y galerías de arte de Madrid en este tour cultural.", 48, "https://viajes.com/madrid-tour-arte.jpg"),
    (1, "Aventuras en Familia", NOW(), "2023-06-15", "viaje-gastronomico", "Barcelona", "Aventuras en familia", "Disfruta de la ciudad en familia", 6, "https://viajes.com/barcelona-aventuras-familia.jpg"),
    (2, "Diversión en Familia", NOW(), "2023-07-20", "viaje-gastronomico", "Barcelona", "Diversión en familia", "Disfruta de la ciudad con tus seres queridos", 99, "https://viajes.com/barcelona-diversion-familia.jpg"),
    (3, "Amor en la Ciudad", NOW(), "2023-08-01", "viaje-romantico", "Barcelona", "Amor en la ciudad", "Disfruta de la ciudad con tu pareja", 32, "https://viajes.com/barcelona-amor-ciudad.jpg"),
    (4, "Noche de Romance", NOW(), "2023-09-15", "viaje-romantico", "Barcelona", "Noche de romance", "Disfruta de una noche romántica en la ciudad", 65, "https://viajes.com/barcelona-noche-romance.jpg"),
    (1, "Aventura en la Ciudad", NOW(), "2023-10-20", "viaje-aventura", "Barcelona", "Aventura en la ciudad", "Descubre la ciudad de una forma emocionante", 43, "https://viajes.com/barcelona-aventura-ciudad.jpg"),
    (1, "Desafío de Aventura", NOW(), "2023-11-01", "viaje-aventura", "Barcelona", "Desafío de aventura", "Supera el desafío en la ciudad", 21, "https://viajes.com/barcelona-desafio-aventura.jpg"),
    (1, "Cultura en la Ciudad", NOW(), "2023-12-15", "viaje-cultural", "Barcelona", "Cultura en la ciudad", "Descubre la riqueza cultural de la ciudad", 11, "https://viajes.com/barcelona-cultura-ciudad.jpg"),
    (2, "Arte en la Ciudad", NOW(), "2024-01-20", "viaje-cultural", "Barcelona", "Arte en la ciudad", "Descubre el arte en la ciudad", 12, "https://viajes.com/barcelona-arte-ciudad.jpg");