const restaurant = require('../models/restaurant-model.js')
const restaurantSeed = require('./seeds.json')

restaurant.deleteMany()
    .then(() => {
        return restaurant.insertMany(restaurantSeed)
    })
    .then(console.log)
    .catch(console.error)
    .finally(() => {
        process.exit
    })