const express = require('express')
const app = express()
const cors = require('cors')
const restaurants = require('./controllers/restaurants')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use('/restaurants', restaurants)

app.listen(3000, () => {
    console.log('listening on port 3000')
})