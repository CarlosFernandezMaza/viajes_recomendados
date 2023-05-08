const express = require("express");
const userRoutes = express.Router();

userRoutes.get("/", (req, res)=>{
res.status(200);
res.send("funcionando")
});



module.exports = {
    userRoutes
}