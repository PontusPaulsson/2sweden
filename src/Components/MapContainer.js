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
        var google;

        function getIcon(transport) {
            switch (transport) {
                case "Walk" :
                    return 'https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_directions_walk_48px-512.png';
                case "Bus" :
                    return 'https://cdn4.iconfinder.com/data/icons/aiga-symbol-signs/439/Aiga_bus-512.png';
                case "Plane" :
                    return 'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-plane-128.png';
                case "Train" :
                    return 'https://cdn4.iconfinder.com/data/icons/aiga-symbol-signs/472/aiga_rail_transportation-512.png';
                case "Car" :
                    return 'https://cdn4.iconfinder.com/data/icons/finance-banking-2/32/car-128.png';
                default :
                    return 'https://cdn2.iconfinder.com/data/icons/interface-12/24/interface-39-512.png';
            }
        }

        let iconMarker = new window.google.maps.MarkerImage(
            getIcon(array.transport),
            null, /* size is determined at runtime */
            null, /* origin is 0,0 */
            null, /* anchor is bottom center of the scaled image */
            new window.google.maps.Size(32, 32));
        return (
            <Marker position={{
                lat: places[array.depPlace].lat,
                lng: places[array.depPlace].lng
            }} icon={iconMarker}
            />
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
                if (map != null) {
                    map.fitBounds(bounds);
                }
                ;
            }
        })
    }
})(MapWithAMarker);

export default MapContainer;