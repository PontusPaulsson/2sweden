import React, {Component} from "react";
import {GoogleMap, Polyline, withGoogleMap, withScriptjs,} from "react-google-maps";
import {lifecycle} from "recompose";
import {IoIosAirplane, IoIosBus, IoIosCar, IoIosWalk, IoMdBug, IoMdTrain} from "react-icons/io";


const {
    MarkerWithLabel
} = require("react-google-maps/lib/components/addons/MarkerWithLabel");
const decodePolyline = require("decode-google-map-polyline");

function createPathMapping(segmentData, places) {
    return segmentData.map(array => {
        let path = array.path;
        if (path === undefined) {
            path = [
                {
                    lat: places[array.depPlace].lat,
                    lng: places[array.depPlace].lng
                },
                {
                    lat: places[array.arrPlace].lat,
                    lng: places[array.arrPlace].lng
                }
            ];
        } else {
            path = decodePolyline(path);
        }
        return (
            <Polyline
                path={path}
                options={{strokeColor: array.strokeColor, strokeWeight: 3}}
                visible={true}
            />
        );
    });
}


function createMarkerMapping(segmentData, places) {
    let markerMapping = segmentData.map(array => {
        function getIcon(transport) {
            let iconColor = 'white';
            let iconSize = '25px';
            switch (transport) {
                case "Walk":
                    return <IoIosWalk color={iconColor} size={iconSize}/>;
                case "Bus":
                    return <IoIosBus color={iconColor} size={iconSize}/>;
                case "Plane":
                    return <IoIosAirplane color={iconColor} size={iconSize}/>;
                case "Train":
                    return <IoMdTrain color={iconColor} size={iconSize}/>;
                case "Car":
                    return <IoIosCar color={iconColor} size={iconSize}/>;
                default:
                    return <IoMdBug color={iconColor} size={iconSize}/>;
            }
        }

        let blueMarker = new window.google.maps.MarkerImage(
            "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", // url
            null, // size
            null, // origin
            null, // anchor
            new window.google.maps.Size(32, 32) // scaledSize
        );
        return (
            <MarkerWithLabel
                position={
                    {
                        lat: places[array.depPlace].lat,
                        lng: places[array.depPlace].lng
                    }
                }
                icon={blueMarker}
                labelAnchor={new window.google.maps.Point(0, 0)}
            >
                <div style={{
                    display: 'flex',
                    border: `solid ${array.strokeColor} 2px`
                }}>
                    {/*Text Styling*/}
                    <div style={{
                        backgroundColor: 'white',
                        margin: 'auto',
                        fontSize: '15px',
                        padding: '3px',
                    }}> {array.from} </div>
                    {/*Icon styling*/}
                    <div style={{
                        backgroundColor: array.strokeColor,
                        margin: 'auto',
                    }}> {getIcon(array.transport)} </div>
                </div>
            </MarkerWithLabel>
        );
    });
    return markerMapping;
}


function createFinalDestinationLabel(segmentData, places) {

    const finalDestination = segmentData[segmentData.length - 1].arrPlace;
    const finalDestinationShortName = places[finalDestination].shortName;
    // Hack to remove google-maps marker.
    const removeMarker = new window.google.maps.MarkerImage(
        "", // url
        null, // size
        null, // origin
        null, // anchor
        new window.google.maps.Size(32, 32)
    ); // scaledSize

    return (
        <MarkerWithLabel
            position={{
                lat: places[finalDestination].lat,
                lng: places[finalDestination].lng
            }}
            icon={removeMarker}
            labelAnchor={new window.google.maps.Point(0, 0)}
            labelStyle={{
                backgroundColor: "white",
                fontSize: "15px",
                border: "solid #ffcc00 1px",
                borderRadius: "5px",
                padding: "0"
            }}
        >
            <div>
                {finalDestinationShortName}
            </div>
        </MarkerWithLabel>
    )
}

class MapContainer extends Component {
    render() {
        return (
            <MapWithAMarkerExtended
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
                    process.env.REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{height: `100%`}}/>}
                containerElement={<div style={{height: `100%`}}/>}
                mapElement={<div style={{height: `100%`}}/>}
                segmentData={this.props.segmentData}
                places={this.props.places}
            />
        );
    }
}

const MapWithAMarker = withScriptjs(
    withGoogleMap(props => (
        <GoogleMap ref={props.zoomToMarkers}>
            {createMarkerMapping(props.segmentData, props.places)}
            {createPathMapping(props.segmentData, props.places)}
            {createFinalDestinationLabel(props.segmentData, props.places)}
        </GoogleMap>
    ))
);

const MapWithAMarkerExtended = lifecycle({
    componentWillReceiveProps() {
        let coords = [
            {
                lng: this.props.places[0].lng,
                lat: this.props.places[0].lat
            },
            {
                lng: this.props.places[1].lng,
                lat: this.props.places[1].lat
            }
        ];
        this.setState({
            zoomToMarkers: map => {
                const bounds = new window.google.maps.LatLngBounds();
                coords.forEach(coord => {
                    bounds.extend(new window.google.maps.LatLng(coord.lat, coord.lng));
                });
                if (map != null) {
                    map.fitBounds(bounds);
                }
            }
        });
    }
})(MapWithAMarker);

export default MapContainer;
