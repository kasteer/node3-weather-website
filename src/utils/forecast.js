//const https = require('request')
const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/b83549c279974e89ba7ad6bfd8e7da34/' + latitude + ',' + longitude + '?units=us'

    //https.request(url, (response) => {})
    request({ url: url, json: true }, (error, response) => {

        if (error) {
            callback('Forecast Error: Unable to connect to weather Services!', undefined)
        } else if (response.body.error) {
            callback('Forecast Error: Unable to find location.  Try another search.', undefined)
        } else {
            callback(undefined, response.body.daily.data[0].summary + ` Current Temp is ` + response.body.currently.temperature + ` degrees.  There is a ` + response.body.currently.precipProbability + `% chance of rain.`)
        }
    })
}

module.exports = forecast