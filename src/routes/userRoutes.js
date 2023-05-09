const express = require("express");
const registerUser = require("../controllers.js/users/registerUser");
const activateUser = require("../controllers.js/users/activateUser");
const loginUser = require("../controllers.js/users/loginUser");
const getUserInfo = require("../controllers.js/users/getUserInfo");

const userRoutes = express.Router();

//endpoints publicos
userRoutes.post("/", registerUser)
userRoutes.get("/activation", activateUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/:id", getUserInfo);

//endpoints privados


module.exports = {
    userRoutes
}