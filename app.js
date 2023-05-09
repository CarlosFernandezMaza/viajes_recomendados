const express = require("express");
require("dotenv").config();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const {userRoutes} = require("./src/routes/userRoutes");
const {tripsRoutes} = require("./src/routes/tripsRoutes");
const {comentariesRoutes} = require("./src/routes/comentariesRoutes");



const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));




app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(express.static("public"));

const { PORT } = process.env;

const port = PORT || 3000;

app.use("/api/v1/users", userRoutes)
app.use("/api/v1/trips", tripsRoutes)
app.use("/api/v1/comentaries", comentariesRoutes)

//Middleware de 404
app.use((req, res) =>
res.status(404).send({
    status: 'error',
    message: "Not Found",
}))

app.listen(port, () =>{
    console.log(`Running on port ${port}`)
});