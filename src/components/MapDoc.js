import React from 'react';
import ReactMapboxGl, { Layer, Feature, Popup} from "react-mapbox-gl";

// const style = "mapbox://styles/wley3337/cjkx3cn5s1cm12sqs586zo4kr"
const style = "mapbox://styles/mapbox/light-v9"
const mapBoxToken=process.env.REACT_APP_MAPBOX_API

const Map = ReactMapboxGl({
    accessToken: mapBoxToken
  });

class MapDoc extends React.PureComponent {

    constructor(props) {
        //set initial map center just once!
        super(props)
        this.state = {
            focus: null    
        }
        this.CENTER = [this.props.long, this.props.lat]
        this.ZOOM = [12]  //starting zoom level 0=far away, 20= very close
    }
   

    handleHover = (eventObj) => {
       this.state.focus ? this.setState({focus: null}) : this.setState({focus: eventObj})
    }

    
    createEventMarkers= () =>{
        return this.props.events.map(eventObj => { 
            let coordinates = eventObj.venue ? [eventObj.venue.lon, eventObj.venue.lat] : [-77.90, 38.03]
           
            return(
                        
               <Feature  
                    properties={eventObj} 
                    coordinates={coordinates} 
                    onClick={(e) => this.props.selectEventForDisplay(e, eventObj)}
                    onMouseEnter={() => this.handleHover(eventObj)}
                    onMouseLeave={() => this.handleHover(eventObj)}
                    key={`marker-${eventObj.id}`}
                />                
            ) 
        })

    }

    render() {
        return( 
        <div>
            {this.props.events === undefined || this.props.events.length=== 0 ? <h2>No events found with those search terms!</h2> : null}
        { (this.props.long) ? 
             <Map
             //this is where you set the initial style properties of the map. Style is built on MapBox
                style={`${style}`}
                    //this is the size properties for map object
                containerStyle={{ 
                    height: "100vh", 
                    width: "100vw"
                }}
                center={this.CENTER}
                zoom = {this.ZOOM}
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
                    {this.props.events.length > 0 ? this.createEventMarkers() : null}
                </Layer> 
                
                
           {/* adds popup when hovering over event */}
                {this.state.focus ? 
                    <Popup
                        coordinates={[this.state.focus.venue.lon, this.state.focus.venue.lat]}
                        offset={{
                            'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
                        }}
                        key={this.state.focus.id}
                        className="popup">
                        <h3>{this.state.focus.name}</h3>
                    </Popup>
                    :
                    null
            
                }
                
            </Map>
            :
            null
        }
      </div>)
    }
}

export default MapDoc;