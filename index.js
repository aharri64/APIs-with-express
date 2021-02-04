require('dotenv').config()
//gives us access to variables in our .env

// //to see the variables using process.env
// console.log(process.env.API_KEY)
const express = require('express')
const app = express()
const axios = require('axios')
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')


//middleware
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

//routes
app.get('/', (req, res) => {
    res.send('hello')
})

app.get('/omdb', (req, res) => {
    const qs = {
        params: {
            s: 'star wars',
            apikey: process.env.API_KEY
        }
    }
    // http://www.omdbapi.com/?s=star+wars&apikey=OUR+key
    axios.get('http://www.omdbapi.com', qs)
        .then((response) => {
            console.log(response.data)
        })
})

// with the swapi API
app.get('/swapi/search', (req, res) => {
    res.render('search')
})

app.get('/swapi/show', (req, res) => {
    console.log('made it here')
    // console.log('param', req.params) // did not need
    console.log('query', req.query) // basic api call to get a person
    // console.log('body', req.body) //did not need
    axios.get(`https://swapi.dev/api/people/${req.query.personID}`)
        .then((response) => {
            //response.data os where our data lives
            console.log(response.data)
            //make a person object
            const person = {
                name: response.data.name,
                birth: response.data['birth_year'],
                home: response.data.homeworld
            }
            res.render('show', person)
        })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`listening on ${PORT}🛳`))