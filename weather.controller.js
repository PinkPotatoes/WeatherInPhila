var http = require('http');

const cityId = "4560349";
const apiKey = "cb9d7a22f63077ef9398bf13d4dca3b5";
class WeatherController {
    getWeather(sendResponse) {
        const url = `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&APPID=${apiKey}`;
        var promise = http.get(url, function (response) {
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