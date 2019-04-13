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
import { useState } from "react";
import { HogeHogeTest } from "./ReactHooksTest"; 



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

const test = () => {
    const [hoge,setHoge] = useState(0);
}

class ReactGoogleMaps extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            lat : 0.0,
            lng : 0.0,
        };
    }

    componentWillMount(){
        this.GetPosition();
    }

    getCurrentPosition = () => {
        return new Promise(
            (
                resolve: (value?: Position) => void,
                reject: (reason?: PositionError) => void
            ) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            }
        );
    }

    GetPosition = async() => {
        const s = await this.getCurrentPosition();

        this.setState( {lat: s.coords.latitude , lng: s.coords.longtitude });

        console.log(s.coords);
    }

    render(){
        return (
            [
                <GitHubForkRibbon
                    key="ribbon"
                    href="https://github.com/tomchentw/react-google-maps"
                    target="_blank"
                    rel="noopener noreferrer"
                    position="right"
                >
                    Fork me on GitHub
                </GitHubForkRibbon>,
                <p> Version {React.version} </p>,
                <HogeHogeTest />,
                <MyMapComponent key="map" />
            ]
        );
    }
}

export default enhance(ReactGoogleMaps);




