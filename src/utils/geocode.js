const request = require("request")

const geocode = (address, callback) => {
    const geourl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoia2VzdGVyZGFuaWVscyIsImEiOiJja3oxdDhtdm0xMHpoMm5vMWhvamVieDhkIn0.n7BecxM4FxpXNn8TdMA9yQ&limit=1"

    request({url: geourl, json: true}, (error, { body } = {}) => {
        if(error){
            callback("Unable to connect to location server. Please try Again", undefined)
        }else if(body.features.length === 0){
            callback("Location not found. Please try with a different search term", undefined)
        }else if(body.message){
            callback("Unable to find Loaction", undefined)
        }else{
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode