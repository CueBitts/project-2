const express = require('express')
// const { appendFile } = require('fs')
const router = express.Router()

const restaurant = require('../models/restaurant-model.js')

// function displaySeed(req, res) {
//     restaurant.find({})
//         .then((restaurants) => res.json(restaurants))
//         .catch((err) => res.json(err))
// }

router.get('/', (req, res) => {
    restaurant.find({})
        .then(restaurants => {
            res.json(restaurants)
        })
})

router.put('/:id', (req, res) => {
    console.log(req.params.id)
    console.log(req.body)
    restaurant.findOneAndUpdate({ _id: req.params.id }, req.body).then(Restaurant =>
        restaurant.find({}).then(restaurants => {
            res.json(restaurants)
        })
    )
})

// router.get('/:id', (req, res) => {
//     restaurant.findById(req.params.id).then(restaurant => {
//       res.json(restaurant)
//     })
// })

router.post('/', (req, res) => {
    restaurant.create(req.body)
        .then(restaurant => {
            console.log('in POST route, this is the new object:...')
            console.log(restaurant)
            
            res.redirect('/restaurants')
        })
})

module.exports = router