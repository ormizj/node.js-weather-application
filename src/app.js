import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import hbs from 'hbs'
import { geocode } from './utils/geocode.js'
import { forecast } from './utils/forecast.js'

const app = express()

// define paths for Express config
const __dirname = dirname(fileURLToPath(import.meta.url))
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// hbs.registerPartial('header.hbs', '<h1>testing</h1>')

// setup static directory to server
app.use(express.static(publicPath))


// pages - start
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Or Mizrahi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Or Mizrahi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Or Mizrahi'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address

    if (!address) return res.send({ error: 'You must provide an address!' })

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) return res.send({ error: error })

        forecast(latitude, longitude, (error, forecast) => {
            if (error) res.send({ error: error })

            res.send({
                location,
                forecast,
                address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search)
        return res.send({ error: 'You must provide a search term!' })

    console.log(req.query)
    res.send({
        products: []
    })
})
// pages - end


// 404 pages - start
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found.',
        name: 'Or Mizrahi'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.',
        name: 'Or Mizrahi'
    })
})
//404 pages - end


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})