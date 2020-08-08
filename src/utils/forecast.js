const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
  const forecastURL = 'http://api.weatherstack.com/current?access_key=9171c9f221c3ed35f6890596aba65d3b&query='+ latitude + ','+ longitude;

  request({url : forecastURL , json : true} , (error , {body})=>{
    if (error){
        callback('No connection, try again later!', undefined)

    } else if (body.error) {
        callback ('Unable to find the location!', undefined)
    } else {
        callback (undefined ,{
            temperature : body.current.temperature,
            feelsLike : body.current.feelslike,
            weatherDescription : body.current.weather_descriptions[0],   
            weatherIcons : body.current.weather_icons   
        })
    }
})
}






module.exports = forecast;