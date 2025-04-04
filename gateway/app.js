const express = require('express')
const expressProxy = require('express-http-proxy')


const app = express()

app.use('/user',expressProxy('http://localhost:3001'))

const PORT = 3000;


app.listen(PORT, () => {
    console.log("Gateway server is listeniing at PORT",PORT)
})

