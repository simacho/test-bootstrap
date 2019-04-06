import _ from "lodash";
import React from "react";
import { compose, withProps } from "recompose";
import {
      withScriptjs,
      withGoogleMap,
      GoogleMap,
      Marker
} from "react-google-maps";
import GitHubForkRibbon from "react-github-fork-ribbon";

var position_lat = 0.0;
var position_longi = 0.0;

const GetPosition = () => {
    var lat = 0.0;
    var longi = 0.0;
    var posi = [];
    if( navigator.geolocation ){
        navigator.geolocation.getCurrentPosition(
          pos => { position_lat = pos.coords.latitude; position_longi = pos.coords.longitude;},
          err => console.log(err)
        );
        console.log(position_lat);
    } else {
        console.log("This is no geolocation");
    }

    return [ lat , longi ]
}

const MyMapComponent = compose(
     withProps({
              googleMapURL:
                "https://maps.googleapis.com/maps/api/js?key=AIzaSyCupuqcB7i6-b-32uo0iF4n6_SpPvHe_YY&v=3.exp&libraries=geometry,drawing,places",
                    loadingElement: <div style={{ height: `100%` }} />,
                        containerElement: <div style={{ height: `400px` }} />,
                            mapElement: <div style={{ height: `100%` }} />
                              }),
      withScriptjs,
      withGoogleMap
)(props => (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: 0.0, lng: 0.0 }}>
        <Marker position={{ lat: 0.0, lng: 0.0 }} />
      </GoogleMap>
));

const enhance = _.identity;

const ReactGoogleMaps = () => [
      <GitHubForkRibbon
              key="ribbon"
        href="https://github.com/tomchentw/react-google-maps"
        target="_blank"
        rel="noopener noreferrer"
        position="right"
      >
        Fork me on GitHub
      </GitHubForkRibbon>,
    <GetPosition />,
      <MyMapComponent key="map" />
];

export default enhance(ReactGoogleMaps);




