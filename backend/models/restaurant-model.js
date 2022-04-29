const mongoose = require('../connections/connection.js')

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    hrs: {
        type: [Number],
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    menu: {
        type: [{name: String, price: Number}],
        required: true
    }
})

const restaurant = mongoose.model('restaurant', restaurantSchema)
module.exports = restaurant