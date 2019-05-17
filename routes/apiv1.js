
var express = require('express');
var router = express.Router();
var request = require('request');
var dbdriver = require('../cloudant_db');

let dbPromise = dbdriver.getDB();
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

// Update database with currently tracked locations
let documentData = { _id: 'locations' }
exports.updateLocations = async function(req, res) {
	try {
		let db = await dbPromise;
		let weatherData = req.body.weatherData;
		if (!weatherData) throw "No data provided"
		// Update an existing documents revisions
		let _rev = (await db.get(documentData._id))._rev;
		await db.insert({ ...documentData, _rev: _rev, weatherData: weatherData});
		res.status(200).send({ success: true })
	} catch (err) {
		res.status(400).send({ success: false })
	}
}

router.post('/locations', exports.updateLocations);

// Retrieve the stored locations from the cloud datastore
exports.getLocations = async function(req, res) {
	try {
		let db = await dbPromise;
		let data = await db.get(documentData._id);
		res.status(200).send({ weatherData: data.weatherData, success: true })
	} catch (err) {
		res.status(400).send({ success: false })
	}
}
router.get('/locations', exports.getLocations);

exports.router = router;
