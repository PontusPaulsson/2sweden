import React from 'react';
import {Component} from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker, Polyline,
} from "react-google-maps";

class MapContainer extends Component {
    render() {
        const decodePolyline = require('decode-google-map-polyline');

        var oslo = {lat: 59.91273, lng: 10.74609}; // Hardcoded stuffs for some nice output
        var sthml = {lat: 59.33258, lng: 18.0649};
        var array = [];
        array.push(oslo);
        array.push(sthml);
        console.log(this.props.children)
        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
                defaultZoom={5}
                defaultCenter={{lat: array[0].lat, lng: array[0].lng}}
            >
                <Polyline path={array}
                          visible={true}
                />

            </GoogleMap>
        ));
        const url = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`;
        return (
            <MapWithAMarker
                googleMapURL={url}
                loadingElement={<div style={{height: `100%`}}/>}
                containerElement={<div style={{height: `400px`}}/>}
                mapElement={<div style={{height: `100%`}}/>}
            />
        )
    }
}

export default MapContainer;