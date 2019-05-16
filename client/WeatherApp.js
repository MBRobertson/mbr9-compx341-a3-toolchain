import React from 'react';
import ReactDOM from 'react-dom';

import { CityInfo } from './CityInfo/CityInfo';
import { MapContainer } from './Map/MapContainer';

import './WeatherApp.scss';

let Header = () => <h1 className='header'>Current Weather</h1>

let SearchHeader = () => <div className='header city-info'>
    <span className='city-input'>Search</span>
    <span className='city'>Location</span>
    <span className='weather'>Weather</span>
</div>

class WeatherApp extends React.Component {
    constructor() {
        super();

        this.state = {
            weatherData: [
                { city: '', weather: '', coords: { lat: 0, lon: 0 }},
                { city: '', weather: '', coords: { lat: 0, lon: 0 }},
                { city: '', weather: '', coords: { lat: 0, lon: 0 }},
                { city: '', weather: '', coords: { lat: 0, lon: 0 }}
            ]
        }

        this.updateData = this.updateData.bind(this);
    }

    // Call back for when a city info control updates the city it is inspecting
    updateData(index, data) {
        let stateData = this.state.weatherData;
        stateData[index] = data;
        this.setState({
            weatherData: stateData
        });
    }

    render() {
        return <div className='app'>
            <Header/>
            <SearchHeader/>
            {this.state.weatherData.map(
                (data, index) => <CityInfo key={index} data={data} index={index} updateData={this.updateData}/>
            )}
            <MapContainer/>
        </div>;
    }
}

ReactDOM.render(<WeatherApp/>, document.getElementById('react-root'))

export default WeatherApp;