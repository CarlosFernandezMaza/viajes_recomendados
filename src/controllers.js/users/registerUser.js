const Joi = require("joi");
const bcrypt = require("bcrypt")
const randomstring = require("randomstring");


const throwJsonError = require("../../errors/throwJsonError");
const createJsonError = require("../../errors/createJsonError");

const { sendEmailRegister } = require("../../helpers.js/mailSmtp");
const { findUserByEmail, createUser } = require("../../repositories.js/usersRepository");



const schema = Joi.object().keys({
    name: Joi.string().min(4).max(120).required(),
    lastname: Joi.string().min(4).max(120).required(),
    user_name: Joi.string().min(4).max(120).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required(),
    verifyPassword: Joi.ref("password")
})

const registerUser = async (req, res) => {
    try {
    
    const {body} = req;
    await schema.validateAsync(body)

    const {name, lastname, user_name, email, password} = body;

    const user = await findUserByEmail(email);
    
    if(user){
        throwJsonError("409", `El usuario ${email} no esta disponible`)
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const verificationCode = randomstring.generate(64);

    const userDB = {
        name, lastname, user_name, email, passwordHash, verificationCode
    }

    const userId = await createUser(userDB)

    await sendEmailRegister(name, lastname, email, verificationCode)
    
    
    res.status(201)
    res.send(`Usuario ${userId} creado correctamente.`)

    } catch (error) {
        createJsonError(error, res)
    }
    
}

module.exports = registerUser;