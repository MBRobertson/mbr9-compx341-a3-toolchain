import fetch from 'node-fetch';

let API_URL='/api/v1';

let DEFAULT_RESPONSE = { city: '', weather: '', coord: { lat: 0, lon: 0 } };

// Given a city name poll the api for information about weather in that city
// returns { city: String, weather: String }
// Values are empty of server returned no values
let getWeather = async function(city) {
    try {
        if (city == '') throw "City should not be empty"
        
        let data = await fetch(API_URL + '/getWeather?city=' + city).then(res => {
            if (res.status != 200) throw "Invalid response code"
            return res.json()
        });
        return data;
    } catch (err) {
        return { ...DEFAULT_RESPONSE, failed: true, city: city };
    }
    
}

let getWeatherLatLon = async function(coord) {
    try {
        if (coord == '') throw "Coord should not be empty"
        
        let data = await fetch(API_URL + '/getWeather?lat=' + coord.lat + '&lon=' + coord.lon).then(res => {
            if (res.status != 200) throw "Invalid response code"
            return res.json()
        });
        return data;
    } catch (err) {
        return { ...DEFAULT_RESPONSE, failed: true };
    }
    
}

// Sync coordinates to database to restore sessions
let updateLocations = async function(weatherData) {
    try {
        let keys = Object.keys(weatherData);
        let coords = keys.map(key => weatherData[key].coord);

        let response = await fetch(API_URL + '/locations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ weatherData: coords })
        }).then(res => res.json())

        return response.success;
    } catch (err) {
        return false;
    }
}

let getSavedLocations = async function() {
    try {
        let data = await fetch(API_URL + '/locations').then(res => res.json());
        return data.weatherData;
    } catch (err) {
        return [];
    }
}

export default { getWeather: getWeather, getWeatherLatLon: getWeatherLatLon, DEFAULT_RESPONSE: DEFAULT_RESPONSE, 
    updateLocations: updateLocations, getSavedLocations: getSavedLocations }
export { getWeather, getWeatherLatLon, DEFAULT_RESPONSE, updateLocations, getSavedLocations }