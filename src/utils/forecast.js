const request = require("request")

const forecast = (lat, lon, callback) => {
    const url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + encodeURIComponent(lat) + "&lon=" + encodeURIComponent(lon) + "&appid=777b61b8deb1b4cf71d7cade81e20b1f&units=us"

    request({url, json: true}, (error, { body } = {}) => {
        if(error){
            callback("Unable to connect to weather server", undefined)
        }else if(body.message){
            callback("Unable to find location", undefined)
        }else{
            callback(undefined, body.daily[0].weather[0].description + ". It has a " + body.current.temp + " degrees temperature and a relative humidity of " + body.current.humidity + "%")
        }
    })
}

module.exports = forecast
