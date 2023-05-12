
const Joi = require("joi");
const createJsonError = require("../../errors/createJsonError");
const { addTrip } = require("../../repositories.js/tripsRepositories");
const throwJsonError = require("../../errors/throwJsonError");



const schema = Joi.object().keys({
    title: Joi.string().max(250).required(),
    dateExperience: Joi.date().required(),
    category: Joi.string().required(),
    city: Joi.string().max(200).required(),
    excerpt: Joi.string().max(300).required(),
    description: Joi.string().required(),

})

const createTrip = async (req, res) => {
    try {
         const {body} = req;
         const {id, user_name, email, role} = req.auth;


         await schema.validateAsync(body);

         

        const tripId = await addTrip(body, id);
       
        if(!tripId){
            throwJsonError(400, "No se ha podido crear el viaje.")
        }
       
    
       res.status(201);
       res.send(`Viaje ${tripId} creado correctamente`)

        
    } catch (error) {
        createJsonError(error, res)
    }
}

module.exports = createTrip;