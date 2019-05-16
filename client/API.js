import fetch from 'node-fetch';

let API_URL='/api/v1';

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
        return { city: '', weather: '', coord: { lat: 0, lon: 0 } }
    }
    
}

export default { getWeather: getWeather }
export { getWeather }