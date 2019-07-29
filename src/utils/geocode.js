const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2FzdGVlciIsImEiOiJjanR4MnB5eTQwb3ZlNGRwZjl6aW81bWZuIn0.HSWaIqupo177LgNevTUghA&limit=1'

    request({ url: url, json: true }, (error, response) => {
        //console.log('Error: ' + error)
        //console.log('Response Length: ' + response.body.features.length)
        if (error) {
            //console.log('Error Response')
            callback('Geocode Error: Unable to connect to Location Services!', undefined)
        } else if (response.body.features.length === 0) {
            //console.log('Length = 0 Response')
            callback('Geocode Error: Unable to find location.  Try another search.', undefined)
        } else {
            //console.log('Found location Response')
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode