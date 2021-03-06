const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/83b853f5bd9ecbb250e3c93002a49b69/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude);
    
    request({ url , json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        }
        else if (body.error) {
            callback('Unable to find location. Try another search', undefined);
        }
        else {
            callback(undefined,
                body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain'
            )
        }

    })

}

module.exports = forecast