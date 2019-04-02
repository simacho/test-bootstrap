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
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
        <Marker position={{ lat: -34.397, lng: 150.644 }} />
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
      <MyMapComponent key="map" />
];

export default enhance(ReactGoogleMaps);




