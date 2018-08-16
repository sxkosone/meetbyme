import React from 'react';
import MapContainer from './MapContainer';
import Search from '../components/Search';

const BASE_URL="http://localhost:3001/users/search?"

class MainDisplay extends React.Component {
    constructor() {
        super()
        this.state = {
            events: [],
            long: null,
            lat: null
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

    render() {
        return (
        <div>
            <Search />
            <MapContainer />
        </div>
    )
    }
}

export default MainDisplay;