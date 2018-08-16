import React from 'react';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";



const Map = ReactMapboxGl({
    accessToken: mapBoxToken
  });
class MapDoc extends React.Component {
    handleOnClick= () =>{
        console.log("clicked")
    }
    createEventMarkers= () =>{
      
        return this.props.events.results.map(eventObj => {
            return(
                <Feature  
                    properties={eventObj} 
                    coordinates={[eventObj.venue.lon, eventObj.venue.lat]} 
                    onClick={() => this.handleOnClick(eventObj)}
                    onMouseEnter={(e) =>{console.log(e.feature.properties)}}
                    key={eventObj.id}
                />
            )
        })
    }
   
    render() {
        return( 
        <div>
        { this.props.long ? 
             <Map
             //this is where you set the initial style properties of the map. Style is built on MapBox
                style={`${style}`}
                    //this is the size properties for map object
                containerStyle={{ 
                    height: "50vh", 
                    width: "50vw"
                }}
                center={[this.props.long, this.props.lat]}
                zoom ={[14]} //starting zoom level 0=far away, 20= very close
             >
                <Layer
                    type="symbol"
                    id="me"
                    layout={{ "icon-image": "marker-15" }}>
                    <Feature coordinates={[this.props.long, this.props.lat]}/>
                </Layer>

                <Layer
                    type="symbol"
                    id="meetup"
                    layout={{ "icon-image": "marker-15" }}>
                    {this.createEventMarkers()}
                </Layer>
            </Map>
            :
            null
        }
      </div>)
    }
}

export default MapDoc;