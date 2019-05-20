import React from "react";
import {Component} from "react";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    Polyline
} from "react-google-maps";
import {lifecycle} from "recompose";

const decodePolyline = require("decode-google-map-polyline");

function createPathMapping(segmentData, places) {
    let pathMapping = segmentData.map((array => {
        var path = array.path;
        if (path === undefined) {
            path = [{
                lat: places[array.depPlace].lat,
                lng: places[array.depPlace].lng
            }
                , {
                    lat: places[array.arrPlace].lat,
                    lng: places[array.arrPlace].lng
                }
            ];
        } else {
            path = decodePolyline(path);
        }
        return (
            <Polyline path={path}
                      options={{strokeColor: array.strokeColor, strokeWeight: 3}}
                      visible={true}
            />
        )
    }));

    return pathMapping;
}

function createMarkerMapping(segmentData, places) {
    let markerMapping = segmentData.map(array => {
        return (
            <Marker defaultAnimation={2} position={{
                lat: places[array.depPlace].lat,
                lng: places[array.depPlace].lng
            }}/>
        )
    });
    return markerMapping;
}


class MapContainer extends Component {
    render() {
        return (
            <MapWithAMarkerExtended
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{height: `100%`}}/>}
                containerElement={<div style={{height: `100%`}}/>}
                mapElement={<div style={{height: `100%`}}/>}
                segmentData={this.props.segmentData}
                places={this.props.places}
            />
        )
    }
}


const MapWithAMarker = withScriptjs(withGoogleMap(props =>
    <GoogleMap
        defaultZoom={2}
        defaultCenter={{lat: 59.91273, lng: 10.74609}}
        ref={props.zoomToMarkers}
    >
        {createMarkerMapping(props.segmentData, props.places)}
        {createPathMapping(props.segmentData, props.places)}

    </GoogleMap>
));

const MapWithAMarkerExtended = lifecycle({
    componentWillReceiveProps() {
        let coords = [{
            lng: this.props.places[0].lng,
            lat: this.props.places[0].lat
        }, {
            lng: this.props.places[1].lng,
            lat: this.props.places[1].lat
        }];
        this.setState({
            zoomToMarkers: map => {
                const bounds = new window.google.maps.LatLngBounds();
                coords.forEach((coord) => {
                    bounds.extend(new window.google.maps.LatLng(coord.lat, coord.lng));
                })
                if(map != null){
                    map.fitBounds(bounds);
                };
            }
        })
    }
})(MapWithAMarker);

export default MapContainer;