const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { query } = require('express')
const request = require('postman-request');


const app = express()
const port = process.env.PORT || 3000


app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '../public')))

const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)

const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

app.get('', (req, res) =>{
  res.render('index', {
    title: 'Weather App',
    name: 'Federico'
  })
})

app.get('/about', (req, res) =>{
  res.render('about', {
    title: 'About',
    name: 'Federico'
  })
})

app.get('/help', (req, res) =>{
  res.render('help', {
    title: 'Help Page',
    name:'Federico'
  })
})




app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({
      error: "You must provide an address!"
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location }= {}) =>{
    if(error){
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) =>{
      if(error) {
        return res.send({ error })
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
})


 


app.get('/help/*', (req, res) =>{
  res.render('404', {
    title: '404-Help',
    name:'Federico',
    errorMessage: 'Help article not found'
  })
})



app.get('*', (req, res) =>{
  res.render('404', {
    title:'404',
    name: 'Federico',
    errorMessage: 'Page not found'
  })
})



app.listen(port, () => {
  console.log('Server is up on port ' + port)
})