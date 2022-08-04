const express = require("express")
const cors = require("cors")
const api = require("./routes/index")
const fileUpload = require("express-fileupload")
const helmet = require("helmet");
// const express_session = require("express-session");
const error_handler = require("./utils/errorHandler");
const { errorMiddleware } = require("./middlewares/custom_error/error");
const path = require("path")


const app = express()
// app.use(helmet());

// Static folders
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// upload middleware
app.use(fileUpload({
  limits: { fileSize: 100 * 1024 * 1024 },
  abortOnLimit: true,
}))
app.use(errorMiddleware)
// app.use(express_session({
//   secret: process.env.ADMIN_COOKIE_PASS,
//   resave: true,
//   saveUninitialized: true
// }))

// Cors middleware
app.use(cors({ origin: "*" }))

// Parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes 
app.use("/api", api)


app.use(error_handler)


module.exports = app