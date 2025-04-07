const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const connect = require('./db/db')
const rideRoutes = require('./routes/ride.routes')
const rabbitMq = require('./service/rabbit')

const app = express();

dotenv.config()
rabbitMq.connect();

connect()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/',rideRoutes)

module.exports = app;