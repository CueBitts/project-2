const express = require('express')
const app = express()
const cors = require('cors')
// const ejsLayouts = require('express-ejs-layouts')
const restaurants = require('./controllers/restaurants')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
// app.set('view engine', 'ejs')
// app.use(ejsLayouts)
app.use('/restaurants', restaurants)

// app.get('/', (req, res) => {
//     res.render('index.ejs', {restaurants: restaurants})
// })

// app.get('/restaurants', (req, res) => {
//     res.json(data)
// })


app.listen(3000, () => {
    console.log('listening on port 3000')
})