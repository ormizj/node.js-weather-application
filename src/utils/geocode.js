import request from 'request'
import { encodeURIComponent } from './encodeUri.js'

export const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3BpZGVycGlnNjAiLCJhIjoiY2t3dnA4aXQ5MDV0eTJuczhyZnd3ZHY2YyJ9.V27Q0kSDt58S6U0S5rvFFQ&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the geocoding service!', undefined)
        } else if (!body.features[0]) {
            callback('Unable to find location, Try another search!', undefined)
        } else {
            const features = body.features[0]
            callback(undefined, {
                latitude: features.center[1],
                longitude: features.center[0],
                location: features.place_name
            })
        }
    })
}

