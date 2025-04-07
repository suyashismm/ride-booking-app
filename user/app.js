const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const connect = require('./db/db')
const userRoutes = require('./routes/user.routes')
const rabbitMq = require('./service/rabbit')

const app = express();

dotenv.config()

connect()
rabbitMq.connect();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/',userRoutes)

module.exports = app;