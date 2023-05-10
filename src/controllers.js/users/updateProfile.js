const Joi = require("joi");
const createJsonError = require("../../errors/createJsonError");
const { newProfile } = require("../../repositories.js/usersRepository");
const bcrypt = require("bcrypt");
const throwJsonError = require("../../errors/throwJsonError");

const schema = Joi.object().keys({
  name: Joi.string().min(4).max(120).required(),
  lastname: Joi.string().min(4).max(120).required(),
  user_name: Joi.string().min(4).max(120).required(),
  password: Joi.string().min(6).max(20).required(),
  verifyPassword: Joi.ref("password"),
  bio: Joi.string().min(6).max(500)
});

const updateProfile = async (req, res) => {
  try {
    const { body } = req;
    const {id} = req.auth;
    await schema.validateAsync(body);

    const { name, lastname, user_name, password, bio } = body; //VER SI SE PUEDE ACTUALIZAR EMAIL MAS ADELANTE
    
    
    const passwordHash = await bcrypt.hash(password, 12);

    const userData = {
      name,
      lastname,
      user_name,
      passwordHash,
      bio,
    };

    
    const affectedRows = await newProfile(userData, id);
    if(affectedRows === 0){
      throwJsonError(400, "No se ha podido actualizar datos de usuario")
    }

    res.status(201);
    res.send(`Usuario ${id} actualizado correctamente.`);
  } catch (error) {
    createJsonError(error, res);
  }
};
module.exports = updateProfile;
