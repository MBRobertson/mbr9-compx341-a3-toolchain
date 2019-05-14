import React from 'react';

import { CityInput } from './CityInput';
import { getWeather } from '../API';

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
            <div>{this.state.city}</div>
            <div>{this.state.weather}</div>
        </div>
    }
}

export default CityInfo;
export { CityInfo };