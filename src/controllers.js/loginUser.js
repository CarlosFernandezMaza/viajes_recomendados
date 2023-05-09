
const Joi = require("joi");
const throwJsonError = require("../errors/throwJsonError");
const createJsonError = require("../errors/createJsonError");


const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { findUserByEmail } = require("../repositories.js/usersRepository");

const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(20).required()
})

const loginUser = async(req, res) => {
    try {
        const{body} = req;

        await schema.validateAsync(body)

        const{email, password} = req.body
        console.log(email, password)

        const user = await findUserByEmail(email);

        if(!user){
            throwJsonError(403, "No existe un usuario con ese email y/o contraseña")
        }

        const {id, user_name, password: passwordHash, createAt, role} = user;

        const isValidPassword = await bcrypt.compare(password, passwordHash)

        if(!isValidPassword){
            throwJsonError(403, "No existe un usuario con ese email y/o contraseña")
        }

        if(!createAt){
            throwJsonError(401, "Debe verificar su cuenta para acceder a nuestros servicios")
        }

        const {JWT_SECRET} = process.env
        const tokenPayLoad = {
            id,
            user_name,
            email,
            role,
            
        }

        const token = jwt.sign(tokenPayLoad, JWT_SECRET, {
            expiresIn: "10m"
        })

        const response = {
            accesToken: token,
            expiresIn: "10m"
        }


        res.status(200)
        res.send(response)
    } catch (error) {
        createJsonError(error, res)
    }
}

module.exports = loginUser;