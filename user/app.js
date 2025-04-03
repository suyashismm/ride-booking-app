const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const connect = require('./db/db')

connect()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const app = express();
dotenv.config()

module.exports = app;