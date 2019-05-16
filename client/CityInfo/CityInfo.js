import React from 'react';

import { CityInput } from './CityInput';
import { getWeather } from '../API';

import './CityInfo.scss';

class CityInfo extends React.Component {
    constructor() {
        super();

        this.onCityChange = this.onCityChange.bind(this);
    }

    async onCityChange(cityName) {
        this.props.updateData(this.props.index, await getWeather(cityName))
    }

    render() {
        return <div className='city-info'>
            <CityInput onUpdate={this.onCityChange}/>
            <span className='city underline'>{this.props.data.city}</span>
            <span className='weather underline'>{this.props.data.weather}</span>
        </div>
    }
}

export default CityInfo;
export { CityInfo };