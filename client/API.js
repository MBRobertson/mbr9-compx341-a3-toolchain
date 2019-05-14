import fetch from 'node-fetch';

let API_URL='http://localhost:3456/api/v1';

// Given a city name poll the api for information about weather in that city
// returns { city: String, weather: String }
// Values are empty of server returned no values
let getWeather = async function(city) {
    return (fetch(API_URL + '/getWeather?city=' + city).then(res => res.json()));
}

export default { getWeather: getWeather }
export { getWeather }