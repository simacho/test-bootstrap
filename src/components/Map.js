import _ from "lodash";
import React from "react";
import GitHubForkRibbon from "react-github-fork-ribbon";
import { useState , useEffect } from "react";
import { HogeHogeTest } from "./ReactHooksTest"; 
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;

const SimpleMap2 = (props) => {
	const
        [ param , setParam ] = useState({center: {lat:59.95, lng: 30.33}, zoom: 11});
    const [ lat , setLat ] = useState( 59.95 );
    const [ longti , setLongti ] = useState( 30.33 );

    useEffect(()=> {
        const s = navigator.geolocation.getCurrentPosition( 
            //pos => { setParam( {center: {lat: pos.coords.latitude , lng: pos.coords.longtitude } , zoom:11 } ) },
            pos => { setLat( pos.coords.latitude || 0.0 );
                    setLongti( pos.coords.longtitude || 0.0 ); },
            err => console.log(err) ); 
    },[lat,longti])

    return (
        // Important! Always set the container height explicitly
      <div style={{ height: '400px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:"AIzaSyCupuqcB7i6-b-32uo0iF4n6_SpPvHe_YY" /* YOUR KEY HERE */ }}
          center={ [lat,longti] }
          // defaultCenter={ param.center }
          defaultZoom={ param.zoom }
        >
          <AnyReactComponent
            lat={ lat }
            lng={ longti }
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
}

class SimpleMap extends React.Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '400px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:"AIzaSyCupuqcB7i6-b-32uo0iF4n6_SpPvHe_YY" /* YOUR KEY HERE */ }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

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
                <SimpleMap2 />,
                <HogeHogeTest />,
                //             <MyMapComponent key="map" />
            ]
        );
    }
}

export default enhance(ReactGoogleMaps);


