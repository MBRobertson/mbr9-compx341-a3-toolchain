import React from 'react';

import { CityInput } from './CityInput';
import { getWeather } from '../API';

import './CityInfo.scss';

class CityInfo extends React.Component {
    constructor() {
        super();

        this.state = {
            city: '',
            weather: ''
        };

        this.onCityChange = this.onCityChange.bind(this);
    }

    async onCityChange(cityName) {
        this.setState(await getWeather(cityName));
    }

    render() {
        return <div className='city-info'>
            <CityInput onUpdate={this.onCityChange}/>
            <span className='city underline'>{this.state.city}</span>
            <span className='weather underline'>{this.state.weather}</span>
        </div>
    }
}

export default CityInfo;
export { CityInfo };