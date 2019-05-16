import React from 'react';

import './CityInfo.scss';

class CityInfo extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div className='city-info'>
            <span className='city underline'>{this.props.data.city}</span>
            <span className='weather'>{this.props.data.weather}</span>
        </div>
    }
}

export default CityInfo;
export { CityInfo };