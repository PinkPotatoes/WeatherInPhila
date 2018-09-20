var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json()); //extract json format data from request body
app.use(bodyParser.urlencoded({extended: false}));
app.use(function(err, req, res, next) {
    res.send(404, err.message);
    next();
})

var WeatherController = require("./weather.controller")

app.get('/weather', function(req, res) {
    var wc = new WeatherController();
    var data = wc.getWeather( (d) => {res.send(d)});
});
app.listen(process.env.PORT || 3000);