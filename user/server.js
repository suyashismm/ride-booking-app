const http = require('http')
const app = require('./app')


const server = http.createServer(app)

const PORT = 3001;

server.listen(PORT,() => {
    console.log("User Server is listening on port",PORT);
})