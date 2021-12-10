import request from 'request'

export const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=86ad1b8068bc4b58da179c7672f6d105&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            const current = body.current
            callback(undefined, current.weather_descriptions[0] + ". It is currently " + current.temperature + " degrees out. It feels like " + current.feelslike + " degrees out.")
        }
    })
}