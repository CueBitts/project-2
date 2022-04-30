const mongoose = require('mongoose')

// const mongoURI = 'mongodb+srv://qhogan:qhogan@cluster0.5ocel.mongodb.net/restaurants'
const mongoURI =
    process.env.NODE_ENV === 'production'
        ?
            process.env.DB_URL
        :
            'mongodb://localhost/project-2'
const db = mongoose.connection

mongoose
    .connect(mongoURI)
    .then((instance) =>
        console.log(`Connected to DB ${instance.connections[0].name}`)
    )
    .catch((error) =>
        console.log('Connection failed', error)
    )

module.exports = mongoose