// In terminal, enter...   nodemon src/app2.js -e js,hbs

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

var ts = new Date()

//path is called above...
//console.log(path.join(__dirname, '../public'))
//__dirname and __filename are part of express!
//console.log(__dirname)
//console.log(__filename)

const app = express()
const port = process.env.PORT || 3000

// Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//enable handlebars (templates) to work in express... enables dynamic websites...
app.set('view engine', 'hbs')
app.set('views', viewsPath) //"views" is default folder name, this changes that to "templates" folder....
hbs.registerPartials(partialsPath)

//set up express public statis directopry to serve...
app.use(express.static(publicDirectoryPath))

//Handle index get
app.get('', (req, res) => {
    //Renders the index.hbs file from the views folder....
    res.render('index', {
        title: 'Weather',
        name: 'Eric Kasten',
        todayDate: ts.toLocaleDateString(),
        todayTime: ts.toLocaleTimeString()
    })
})

//Handle /about get
app.get('/about', (req, res) => {
    //Renders the index.hbs file from the views folder....
    res.render('about', {
        title: 'ABOUT ME',
        name: 'Eric Kasten',
        todayDate: ts.toLocaleDateString(),
        todayTime: ts.toLocaleTimeString()
    })
})

//Handle /help get
app.get('/help', (req, res) => {
    //Renders the index.hbs file from the views folder....
    res.render('help', {
        title: 'HELP',
        helpText: 'Helpfule text goes here',
        name: 'Eric Kasten',
        todayDate: ts.toLocaleDateString(),
        todayTime: ts.toLocaleTimeString()
    })
})

//root url... doesnt load cause  app.use loads the index.html file...
//app.get('', (req, res) => {
//    res.send('<h1>HOME Page (Express)</h1>')
//})

//app.get('/help', (req, res) => {
    //JSON
    //res.send({
    //    name: 'Eric',
    //    age: 48
    //})
    //res.send('Help Page')
//})

//app.get('/about', (req, res) => {
    //res.send('About Page')
    //res.send('<h1>ABOUT Page (Express)</h1>')
//})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            //console.log('Geocode Error: ' + error)
            return res.send({error})
        } 
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                //console.log('Forecast Error: ' + error)
                return res.send({error})
            } 
    
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    //console.log(req.query.address)

    //res.send({
    //    address: req.query.address,
    //    forecastToday: 'Sunny with chance of rain',
    //    todayDate: ts.toLocaleDateString(),
    //    todayTime: ts.toLocaleTimeString()
    //})
})

//TEST.....
app.get('/test', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search turn.'
        })
    }
    //http://localhost:3000/test?search=games&rating=5
    console.log(req.query.search)
    console.log(req.query.rating)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error.',
        errorMessage: 'Help article not found.',
        name: 'Eric Kasten',
        todayDate: ts.toLocaleDateString(),
        todayTime: ts.toLocaleTimeString()
    })
})

//Handle 404 Errors, must be last, * represents anything else....
app.get('*', (req, res) => {
    //Renders for 404 Errors... page not found....
    res.render('404', {
        title: '404 Error.',
        errorMessage: 'Page not found',
        name: 'Eric Kasten',
        todayDate: ts.toLocaleDateString(),
        todayTime: ts.toLocaleTimeString()
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '. ' + ts.toLocaleDateString() + ' ' + ts.toLocaleTimeString())
})