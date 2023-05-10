
const path = require("path");
const fs = require("fs").promises
const randomstring = require("randomstring");
const throwJsonError = require("../../errors/throwJsonError");
const createJsonError = require("../../errors/createJsonError");
const { findTripById } = require("../../repositories.js/usersRepository");
const { addimage, findUserIdInTrip } = require("../../repositories.js/tripsRepositories");


const updateTripImage = async (req, res) =>{
    try {

        const {id, email} = req.auth;
        const {id:idTrip} = req.params;
        
        //comprobar que el idTrip corresponda al id del user!!!
        const [idUser] = await findUserIdInTrip(idTrip)

        if(idUser.id !== id){
            throwJsonError(400, "No puedes actualizar la imagen de otro usuario.")
        }
        

        const validateExtension = [".jpeg", ".jpg", ".png"]

         const {files} = req;
        
         const {tripImage} = files;
        

        if(!files){
            throwJsonError(400, "No se ha seleccionado el fichero")
        }

        const extension =  path.extname(tripImage.name)

        if(!validateExtension.includes(extension)){
            throwJsonError(400, "Formato no valido")
        }

        const trip = await  findTripById(idTrip);
        console.log("*********")
        console.log(trip)
        console.log("*********")
        const {image} = trip

        
        const pathTripImage = path.join(__dirname, "../../../public/tripImages")
        const random = randomstring.generate(10)
        const imageName = `${id}-${random}${extension}`
        const pathImage = (path.join(pathTripImage, imageName))

        
        
        if(image){
            
            await fs.unlink(path.join(pathTripImage, image))
        }

       

        tripImage.mv(pathImage, async function(err){
            if(err) return res.status(500).send(err)

            //aca esta el error!!!!!
            await addimage(imageName, idTrip);
           
           res.status(200);
            res.send(`Imagen actualizada correctamente`)
        })

       

    } catch (error) {
        createJsonError(error, res)
    }
}

module.exports = updateTripImage;