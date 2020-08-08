const request = require('postman-request');


const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +  encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWxwaHlvIiwiYSI6ImNrY3VrZXdwcDI5aHgyc21vMTlwYzV0MjUifQ.6sXCt_GVOzw39-la-8JnIA&limit=1'

  request({ url, json:true }, (error, {body}) => {
    if(error) {
      	callback('Unable to fetch data!', undefined)
    }else if(body.features.length < 1) {
      callback('Invalid location!', undefined)
    }else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  }) 
}



module.exports = geocode