import React from 'react';
import MapDoc from '../components/MapDoc';
import Search from '../components/Search';
import EventDisplay from '../components/EventDisplay'

const BASE_URL="http://localhost:3001/users/search?"

class MainDisplay extends React.Component {
    constructor() {
        super()
        this.state = {
            events: [],
            long: null,
            lat: null,
            selectedEvent: null
        }
    }

    componentDidMount() {
        console.log("maindisplay mounted")
        this.getUserLocationAndFetchEvents()
    }

    fetchInitialEvents = (lat, long) => {
        //returns a promise that holds the results of our API call to MEETUP
        return fetch(`${BASE_URL}lat=${lat}&long=${long}`).then(r => r.json())
        
    }

    getUserLocationAndFetchEvents = () => {
        navigator.geolocation.getCurrentPosition((pos) => {
            this.fetchInitialEvents(pos.coords.latitude, pos.coords.longitude).then(response => {
                this.setState({
                events: response,
                long: pos.coords.longitude,
                lat: pos.coords.latitude
                })
            })
        })
    }

    selectEventForDisplay = (eventObj) => {
        this.setState({
            selectedEvent: eventObj
        })
    }

    render() {
        return (
        <div>
            <Search />
            {this.state.selectedEvent ? <EventDisplay event={this.state.selectedEvent}/> : null}
            <MapDoc 
            long={this.state.long} 
            lat={this.state.lat} 
            events={this.state.events} 
            selectEventForDisplay={this.selectEventForDisplay}/>
        </div>
    )
    }
}

export default MainDisplay;