const http = require('http')
const app = require('./app')


const server = http.createServer(app)

const PORT = 3003;

server.listen(PORT,() => {
    console.log("Ride Server is listening on port",PORT);
})