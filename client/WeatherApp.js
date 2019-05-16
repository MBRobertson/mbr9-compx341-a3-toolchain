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

    render() {
        return <div className='app'>
            <Header/>
            <SearchHeader/>
            <CityInfo/>
            <CityInfo/>
            <CityInfo/>
            <CityInfo/>
            <MapContainer/>
        </div>;
    }
}

ReactDOM.render(<WeatherApp/>, document.getElementById('react-root'))

export default WeatherApp;