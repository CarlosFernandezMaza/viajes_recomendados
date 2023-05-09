const express = require("express");
const registerUser = require("../controllers.js/registerUser");
const activateUser = require("../controllers.js/activateUser");
const loginUser = require("../controllers.js/loginUser");
const userRoutes = express.Router();

userRoutes.post("/", registerUser)
userRoutes.get("/activation", activateUser);
userRoutes.post("/login", loginUser);



module.exports = {
    userRoutes
}