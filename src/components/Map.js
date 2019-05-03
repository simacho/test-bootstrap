import _ from "lodash";
import React from "react";
import GitHubForkRibbon from "react-github-fork-ribbon";
import { useState , useEffect } from "react";
import { HogeHogeTest } from "./ReactHooksTest"; 
import GoogleMapReact from 'google-map-react';
import { BbsThread , BbsCreate } from "./BbsThread";
import { MessageCreate } from "./BbsMessage";
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;

const SimpleMap2 = (props) => {
    const [ lat , setLat ] = useState( 59.95 );
    const [ lng , setLng ] = useState( 30.33 );

    useEffect(()=> {
        const s= navigator.geolocation.getCurrentPosition( 
            pos => { setLat( pos.coords.latitude || 0.0 );
                    setLng( pos.coords.longitude || 0.0 ); },
            err => console.log(err) ); 
    },[lat,lng])

    return (
        // Important! Always set the container height explicitly
      <div style={{ height: '400px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:"AIzaSyCupuqcB7i6-b-32uo0iF4n6_SpPvHe_YY" }}
          center={ { lat: lat, lng: lng } }          // defaultCenter={ param.center }
          defaultZoom={ 11 }
        >
          <AnyReactComponent
            lat={ lat }
            lng={ lng }
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
}

const enhance = _.identity;


const ReactGoogleMaps = () => {
    
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
                <SimpleMap2 />,
            ]
        );
}

export default enhance(ReactGoogleMaps);

