const request = require('request');
const geocode = (adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1IjoiYXJzZW5lbWF5YW0iLCJhIjoiY2p0aGI1OWViMG5sZDQzcGo4aGtpejJ0aSJ9.28-ydudNGcK1i1-Nm97FlA'
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[1].center[1],
                longitude: body.features[1].center[0],
                location: body.features[1].place_name
            })
        }
    })
}

module.exports = geocode