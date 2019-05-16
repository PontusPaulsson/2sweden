import React from "react";
import {Component} from "react";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    Polyline
} from "react-google-maps";

class MapContainer extends Component {
    render() {

        const decodePolyline = require("decode-google-map-polyline");
        console.log(this.props.children)
        let pathMapping = this.props.children.map((array => {
            var path = array.path;
            if (path === undefined) {
                let coordinates = [{
                    lat: this.props.places[array.depPlace].lat,
                    lng: this.props.places[array.depPlace].lng
                }
                    , {
                        lat: this.props.places[array.arrPlace].lat,
                        lng: this.props.places[array.arrPlace].lng
                    }
                ];
                path = coordinates;
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

        //  let mapMarker = this.props.children.map(( ))

        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
                defaultZoom={2}
                defaultCenter={{lat: 59.91273, lng: 10.74609}}
            >

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
