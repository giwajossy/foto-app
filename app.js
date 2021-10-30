/* -------------------------------------------------------------------------- */
/*                              External imports                              */
/* -------------------------------------------------------------------------- */

const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cloudinary = require("cloudinary")
const multer = require("multer")
require("dotenv").config()

const app = express()


/* -------------------------------------------------------------------------- */
/*                              Internal imports                              */
/* -------------------------------------------------------------------------- */
const rootRoute = require("./routes/user.routes")



/* -------------------------------------------------------------------------- */
/*                              Middleware                                    */
/* -------------------------------------------------------------------------- */

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use("/", rootRoute)



app.listen(process.env.PORT || 3000, () => console.log("server running"))


