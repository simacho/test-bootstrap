import React from "react"
import ReactGoogleMapLoader from "react-google-maps-loader"
import ReactGoogleMap from "react-google-map"

const bnCoord = {
    lat: 44.597923,
    lng: 0.873799,
}

export class MapTest extends React.Component {
    render(){
        return (
            <div>
                <ReactGoogleMapLoader
                    params={{
                        key: "AIzaSyCupuqcB7i6-b-32uo0iF4n6_SpPvHe_YY",
                        libraries: "places,geometry", // To request multiple libraries, separate them with a comma
                    }}
                    style={{height: "100%"}}
                    render={googleMaps => {
                        return (
                            <ReactGoogleMap
                                googleMaps={googleMaps}
                                coordinates={[
                                    {
                                        title: "Bosc Nègre",
                                        position: bnCoord,
                                    },
                                ]}
                                center={bnCoord}
                                zoom={8}
                            />
                        )
                    }}
                />
            </div>
);
    }
}

export default MapTest
