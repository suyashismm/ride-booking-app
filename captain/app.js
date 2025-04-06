const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const connect = require('./db/db')
const app = express();
const captainRoutes = require('./routes/captain.routes')

connect()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
dotenv.config()


app.use('/',captainRoutes)

module.exports = app;