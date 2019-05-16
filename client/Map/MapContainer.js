import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

import './MapContainer.scss';

let GOOGLE_MAPS_API_KEY = 'AIzaSyCxi0RT7_sv_9cSMQxW94EH5Zy62RsYPKc';

class MapContainer extends React.Component {
    render() {
        let NZ_LAT_LNG = {
            lat: -40.9006,
            lng: 174.8860
        }

        var NEW_ZEALAND_BOUNDS = {
            north: -34.36,
            south: -47.35,
            west: 166.28,
            east: -175.81,
          };

        let mapOptions = {
            gestureHandling: 'greedy',
            minZoom: 5,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            // Make sure the user stays viewing New Zealand
            restriction: {
                latLngBounds: NEW_ZEALAND_BOUNDS
            }
        }

        // Transform lon -> lng for google maps format
        let markerCoords = this.props.markers.map(coord => {
            return {
                lat: coord['lat'],
                lng: coord['lon']
            }
        });

        return (
            <div className='google-map'>
                <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                    <GoogleMap mapContainerStyle={{
                        height: "100%",
                        width: "100%"
                    }} 
                    zoom={5}
                    center={NZ_LAT_LNG}
                    options={mapOptions}>
                    
                        {markerCoords.map((coord, index) => 
                            <Marker key={index} position={coord}/>
                        )}

                    </GoogleMap>
                </LoadScript>
            </div>
        )
    }
}

export default MapContainer
export { MapContainer }