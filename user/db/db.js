const mongoose = require('moongoose')


function connect () {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("Database connected successfully")
    }).catch(error => console.log("Error connecting database",error))
}


module.exports = connect;