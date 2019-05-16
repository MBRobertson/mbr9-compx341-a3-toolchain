import React from 'react';
import ReactDOM from 'react-dom';
import API from './API';

import { CityInfo } from './CityInfo/CityInfo';
import { MapContainer } from './Map/MapContainer';
import { SearchBar } from './Misc/SearchBar';

import './WeatherApp.scss';

let Header = () => <h1 className='header'>New Zealand Weather Map</h1>

class WeatherApp extends React.Component {
    constructor() {
        super();

        this.nextIndex = 1;

        this.state = {
            weatherData: {}
        }

        this._addLocation = this._addLocation.bind(this);
        this.deleteLocation = this.deleteLocation.bind(this);
        this.addLocationFromCity = this.addLocationFromCity.bind(this);
        this.addLocationFromCoord = this.addLocationFromCoord.bind(this);

    }

    async _addLocation(dataPromise, placeholder) {
        // Set a temporary state
        let stateData = this.state.weatherData;
        let index = this.nextIndex++;
        stateData[index] = { ...API.DEFAULT_RESPONSE, ready: false, city: placeholder };
        this.setState({ weatherData: stateData });

        let data = await dataPromise;
        stateData = this.state.weatherData;
        // Check that the entry hasn't been removed in the mean time
        if (index in stateData) {
            stateData[index] = { ...data, ready: true }
            this.setState({ weatherData: stateData });
        }
    }

    deleteLocation(index) {
        let stateData = this.state.weatherData;
        delete stateData[index];
        this.setState({ weatherData: stateData });
    }

    // Track a city, searching for it by name
    async addLocationFromCity(city) {
        this._addLocation(API.getWeather(city), city)
    }

    // Track a city, searching for it by coordinate
    async addLocationFromCoord(coord) {
        this._addLocation(API.getWeatherLatLon(coord), coord.lat.toFixed(2) + "," + coord.lon.toFixed(2))
    }

    render() {
        let data = this.state.weatherData;
        let dataKeys = Object.keys(data);
        return <div className='app'>
            <Header/>
            <section className='search'>
                <SearchBar onSearch={this.addLocationFromCity}/>
            </section>
            <section className='data-info'>
                {dataKeys.map(
                    (key) => <CityInfo key={key} onClose={this.deleteLocation} index={key} data={this.state.weatherData[key]}/>
                )}
                {(dataKeys.length == 0) ? <p>To get started type a city name above, or select a location on the map below</p> : []}
            </section>
            <section className='map'>
                <MapContainer 
                    onLocationSelect={this.addLocationFromCoord}
                    markers={
                        dataKeys.filter(key => data[key].coord.lat != 0).map(key => data[key].coord)
                    }
                />
            </section>
        </div>;
    }
}

ReactDOM.render(<WeatherApp/>, document.getElementById('react-root'))

export default WeatherApp;