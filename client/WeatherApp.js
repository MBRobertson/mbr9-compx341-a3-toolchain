import React from 'react';
import ReactDOM from 'react-dom';

import { CityInfo } from './CityInfo/CityInfo';

import './WeatherApp.scss';

class WeatherApp extends React.Component {
    render() {
        return <div>
            <CityInfo/>
        </div>;
    }
}

ReactDOM.render(<WeatherApp/>, document.getElementById('react-root'))