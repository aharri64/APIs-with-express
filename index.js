require('dotenv').config()
//gives us access to variables in our .env

// //to see the variables using process.env
// console.log(process.env.API_KEY)
const express = require('express')
const app = express()
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

const PORT = process.env.PORT || 8000
app.listen(PORT, console.log(`listening on ${PORT}🛳`))