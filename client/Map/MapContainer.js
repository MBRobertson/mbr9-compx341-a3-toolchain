import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api'

import './MapContainer.scss';

let GOOGLE_MAPS_API_KEY = 'AIzaSyCxi0RT7_sv_9cSMQxW94EH5Zy62RsYPKc';

class MapContainer extends React.Component {
    render() {
        return (
            <div className='google-map'>
                <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                    <GoogleMap mapContainerStyle={{
                        height: "100%",
                        width: "100%"
                    }} 
                    zoom={5}
                    center={{
                        lat: -40.9006,
                        lng: 174.8860
                    }}/>
                </LoadScript>
            </div>
        )
    }
}

export default MapContainer
export { MapContainer }