var http = require('https');

var apiKey = "55332cbe654dd39daba89a39c1d41683";
// Philadelphia latitude and longitude
// var lat = 39.9526;
// var long = 75.1652;
function WeatherController(){
    this.getWeather = function(lat, long, sendResponse) {
        try {
            var url = "https://api.darksky.net/forecast/" + apiKey + "/" + lat + "," + long;
            http.get(url, function (response) {
                console.log('Status:', response.statusCode);
                var data = '';
                // If it encounters an error
                if (response.statusCode != 200) {
                    sendResponse({success: false, payload: "error"});
                    return;
                }
                response.on('error', function (err) {
                    sendResponse({success: false, payload: err});
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
        }catch(err) {
            sendResponse({success:false, payload: err});
        }
    }
}

module.exports = WeatherController;