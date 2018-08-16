import React from 'react';
import ReactMapboxGl, { Layer, Feature, Popup} from "react-mapbox-gl";

const mapBoxToken= "pk.eyJ1Ijoid2xleTMzMzciLCJhIjoiY2prd2p2amxnMGlndDN3bzVieWE0N2dsbyJ9.aSerRKvNmEuVsN5R4k174Q"
const style = "mapbox://styles/wley3337/cjkwtf1sp1a8b2ro0ojr9f8oe"

const Map = ReactMapboxGl({
    accessToken: mapBoxToken
  });
class MapDoc extends React.Component {

    handleOnClick= () =>{
        console.log("clicked")
    }

    handleOnHover = (eventObj) => {
        console.log(eventObj);
       
        // <Popup
        //     coordinates={[eventObj.venue.lon, eventObj.venue.lat]}
        //     offset={{
        //         'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
        //     }}
        //     key={eventObj.id}
        //     >
        //     <h1>{eventObj.name}</h1>
        // </Popup>
    }


    createEventMarkers= () =>{
        return this.props.events.results.map(eventObj => { 
            return(
                        
                <Feature  
                    properties={eventObj} 
                    coordinates={[eventObj.venue.lon, eventObj.venue.lat]} 
                    onClick={() => this.handleOnClick(eventObj)}
                    onMouseEnter={() => this.handleOnHover(eventObj)}
                    key={`marker-${eventObj.id}`}
                />                
            )
        })
    }
   
    render() {
        return( 
        <div>
        { (this.props.long && this.props.events.length !== 0) ? 
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