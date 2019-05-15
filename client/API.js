import fetch from 'node-fetch';

let API_URL='/api/v1';

// Given a city name poll the api for information about weather in that city
// returns { city: String, weather: String }
// Values are empty of server returned no values
let getWeather = async function(city) {
    try {
        return (fetch(API_URL + '/getWeather?city=' + city).then(res => res.json()));
    } catch (err) {
        return { city: '', weather: '' }
    }
    
}

export default { getWeather: getWeather }
export { getWeather }