// express documentation can be found at expressjs.com
import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs';
import { geocode } from './utils/geocode.js';
import { forecast } from './utils/forecast.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const __filename = fileURLToPath(import.meta.url);

const  app = express();

// define paths for express config
const publicDirectoryPath = join(__dirname, '../public')
const viewsPath = join(__dirname, '../templates/views')
const partialsPath = join(__dirname, '../templates/partials');

const name = "James Farmer"

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=>{
    res.render('index',{
        title: "Weather",
        name: name
    })
})

app.get('/about', (req, res) =>{
    res.render('about',{
        title: 'Much ado about nothing',
        name: name
    })
})

app.get('/help', (req, res) =>{
    res.render('help',{
        title: 'Helpppp',
        message: 'What did you expect, actual help, that aint happening',
        name: name
    })
})

app.get('/weather',(req, res)=>{
    if (!req.query.address){
        return res.send({
            error: "you must provide an address"
        })
    }

    geocode(req.query.address,(error, {latitude, longitute, location} = {}) =>{
        if (error){
            return res.send({Error: error})
        } 

        forecast(latitude, longitute, (error, ForecastData)=>{
            if (error){
                return res.send({Error: error})
            }
            res.send({
                forecast: ForecastData,
                location,
                address: req.query.address
            })
        });
    })
    
})



app.get('/products',(req, res)=>{
    if (!req.query.search){
        return res.send({
            error: "you must provide a search term"
        })
    }

    console.log(req);
    res.send({
        products:[]
    })
})

app.get('/help/*',(req, res) =>{
    
    res.render('404',{
        title: '404',
        errorMsg: "Help article not found.",
        name: name
    })
    
})

app.get('*', (req, res)=>{
    res.render('404',{
        title: '404',
        errorMsg: 'Page not found.',
        name: name

    })
})
app.listen(3002, () => {
    console.log('Server is up on port 3002.')
})

