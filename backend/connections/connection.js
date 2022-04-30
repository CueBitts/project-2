const mongoose = require('mongoose')

const mongoURI = 'mongodb+srv://qhogan:qhogan@cluster0.5ocel.mongodb.net/restaurants'
const db = mongoose.connection

mongoose
    .connect(mongoURI)
    .then((instance) =>
        console.log(`connected to DB ${instance.connections[0].name}`)
    )
    .catch((error) =>
        console.log('connection failed', error)
    )

module.exports = mongoose