var http = require('https');

var apiKey = "55332cbe654dd39daba89a39c1d41683";
var lat = 39.9526;
var long = 75.1652;
function WeatherController(){
    this.getWeather = function(sendResponse) {
        // const url = `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&APPID=${apiKey}`;
        var url = "https://api.darksky.net/forecast/"+apiKey+"/"+lat+","+long;//39.9526,75.1652";
        http.get(url, function (response) {
            console.log('Status:', response.statusCode);
            let data = '';
            // If it encounters an error
            if (response.statusCode != 200) {
                sendResponse({success: false, payload: response});
                return;
            }
            response.on('error', function (err) {
                sendResponse({success:false, payload: err});
                return;
            })

            // Else get data and send it back
            response.on('data', function (chunk) {
                data += chunk;
            })
            response.on('end', function () {
                sendResponse({success: true, payload: JSON.parse(data)});
            })
        });
    }
}

module.exports = WeatherController;