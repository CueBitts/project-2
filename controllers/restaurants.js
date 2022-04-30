const express = require('express')
const router = express.Router()
const restaurant = require('../models/restaurant-model.js')

router.get('/', (req, res) => {
    restaurant.find({})
        .then(restaurants => {
            res.json(restaurants)
        })
})

router.post('/', (req, res) => {
    restaurant.create(req.body)
        .then(
            res.redirect('/restaurants')
        )
})

module.exports = router