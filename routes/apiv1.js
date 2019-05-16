
var express = require('express');
var router = express.Router();
var request = require('request');

var OPENWEATHERURL = "http://api.openweathermap.org/data/2.5/weather?appid=15fe5de8d743843fdadd3ad7b5a458a7&units=metric";

exports.getWeather = function(req, res) {
	var city = req.query.city;
	var lat = req.query.lat;
	var lon = req.query.lon

	// If not enough parameters
	if( ((city === null) || (typeof(city) === 'undefined')) && !(lat && lon)) {
		return res.status(400).send('insufficient query provided');
	}

	// If too many parameters
	if (city && lat && lon) {
		return res.status(400).send('only one of city or lat/lon should be specified')
	}

	let aurl = OPENWEATHERURL;
	if (city)
		aurl = aurl + '&q=' + city + ',nz';
	else
		aurl = aurl + '&lat=' + lat + '&lon=' + lon;

	request({
		method: 'GET',
        url: aurl,
  		json: true
    }, function(err, resp, body) {
    	if(err) {
    		res.status(400).send('Failed to get the data');
    		//console.error("Failed to send request to openweathermap.org", err);
    	} else {
    		if(body.cod === 200) {
    			var weather = "Conditions are " + body.weather[0].main + " and temperature is " + body.main.temp + ' C';
    			var response = {city: body.name, weather: weather, coord: body.coord};
    			return res.status(200).send(response);
    		} else {
                return res.status(400).send({msg:'Failed'});
            }
    	}
    });

};
router.get('/getWeather', exports.getWeather);

exports.router = router;
