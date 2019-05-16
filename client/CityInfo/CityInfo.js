import React from 'react';

import './CityInfo.scss';

class CityInfo extends React.Component {
    constructor() {
        super();
        this.onClose = this.onClose.bind(this);
    }

    onClose() {
        if (this.props.onClose)
            this.props.onClose(this.props.index)
    }

    render() {
        let { city, weather, ready, failed } = this.props.data;
        return <div className={'city-info' + (ready ? '' : ' pending')}>
            <span className='city underline'>
                <span>{city == '' || failed ? 'Unknown Location' : city}</span>
                <i className='close material-icons' onClick={this.onClose}>close</i>
            </span>
            <span className='weather'>{ready ? (failed ? 'No data avaliable for \'' + city + '\'.' : weather) : <i className='material-icons'>cached</i>}</span>
        </div>
    }
}

export default CityInfo;
export { CityInfo };