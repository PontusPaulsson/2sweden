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

        let array = [];
        for (let i = 0; i < this.props.children.length; i++) {
            if (this.props.children[i].path === undefined) {
                array.push("Flyg");
            } else {
                array.push(decodePolyline(this.props.children[i].path))
            }
        }

        let pathMapping = array.map((path => {
            return (
                <Polyline path={path}/>
            )
        }));

        let markerMapping = array.map((marker => {
            return (
                <Marker place={{lat: array[0][0].lat, lng: array[0][0].lng}} visible={true}/>
            )
        }));

        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
                defaultZoom={5}
                defaultCenter={{lat: array[0][0].lat, lng: array[0][0].lng}}
            >
                <Marker position={{lat: array[0][0].lat, lng: array[0][0].lng}} visible={true}/>
                {pathMapping}

            </GoogleMap>
        ));
        return (
            <MapWithAMarker
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{height: `100%`}}/>}
                containerElement={<div style={{height: `100%`}}/>}
                mapElement={<div style={{height: `100%`}}/>}
            />
        )
    }
}

export default MapContainer;