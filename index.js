const express = require('express')
const app = express()
const cors = require('cors')
const restaurants = require('./controllers/restaurants')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use('/restaurants', restaurants)

// if (process.env.NODE_ENV === "production") {
//       app.use(express.static("build"));
//       app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname,  "build", "index.html"));
//       });
//     }

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

// app.listen(3000, () => {
//     console.log('listening on port 3000')
// })

app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`)
})

// app.listen(process.env.PORT || 3000, function() {
//     console.log(`Listening on port ${this.address().port}`)
// })