import React from 'react';
import MapDoc from '../components/MapDoc';
import Search from '../components/Search';
import EventDisplay from '../components/EventDisplay'
import '../index.css'
import { Dimmer, Loader } from 'semantic-ui-react'
import Navbar from './Navbar'
import UserShow from './UserShow'


const BASE_URL="http://localhost:3001/search"
const BASE_USER_URL="http://localhost:3001/users/"

class MainDisplay extends React.Component {
    constructor() {
        super()
       
        this.state = {
            events: [],
            long: null,
            lat: null,
            selectedEvent: null,
            popupEvent: null,
            loading: true,
            userId: null,
            currentUser: null
            
        }
        this.categories = []
    }

    componentDidMount() {
        console.log("maindisplay mounted")
        this.getUserLocationAndFetchEvents()
        this.fetchAllCategories()
        
    }

    setUserId= (userId) =>{
        this.setState({userId: userId})
    }

    handleLogOut = () =>{
        localStorage.clear()
        this.setState({
            userId: null,
            currentUser: null
        })
    }


    fetchInitialEvents = (lat, long) => {
        //returns a promise that holds the results of our API call to MEETUP
        return fetch(`${BASE_URL}?lat=${lat}&long=${long}`).then(r => r.json())
        
    }

    fetchAllCategories = () => {
        fetch(BASE_URL+"/categories")
        .then(r => r.json())
        .then(data => this.categories=data.results)
    }

    fetchEventsByCategory = (categoryId) => {
        //should I change state back to loading: true
        fetch(`${BASE_URL}?lat=${this.state.lat}&long=${this.state.long}&category=${categoryId}`).then(r => r.json())
        .then(console.log)
    }

    getUserLocationAndFetchEvents = () => {
        navigator.geolocation.getCurrentPosition((pos) => {
            this.fetchInitialEvents(pos.coords.latitude, pos.coords.longitude).then(response => {
                this.setState({
                events: response,
                long: pos.coords.longitude,
                lat: pos.coords.latitude,
                loading: false
                })
            })
        })
    }


    selectEventForDisplay = (e, eventObj) => {
        console.log("clicked", e)
        this.setState({
            selectedEvent: eventObj
        })
    }

    closeDisplay = () => {
        this.setState({
            selectedEvent: null
        })
    }

    focusOnEvent = (eventObj) => {
        console.log("focusing on", eventObj)
        let newVal = this.state.popupEvent ? null : eventObj
        this.setState({
            popupEvent: newVal
        })
    }
    fetchCurrentUserObj = (userId) =>{
        console.log(userId);
        fetch(BASE_USER_URL + userId, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem("token")}`
              }
        })
        .then(r => r.json())
        .then(userObj => this.setCurrentUser(userObj))
    }

    setCurrentUser= (userObj) =>{
        this.setState({
            currentUser: userObj
        })
    }
    

    showLoadingAnimation() {
        if (this.state.loading) {
            return (
                <Dimmer active>
                    <Loader />
                </Dimmer>
            )
        }
    }

    renderMapIfReady() {
        return !this.state.loading ? <MapDoc 
        long={this.state.long} 
        lat={this.state.lat} 
        events={this.state.events} 
        selectEventForDisplay={this.selectEventForDisplay}
        popUpEvent={this.state.popupEvent}
        togglePopUpFocus={this.focusOnEvent}/> : null
    }
    convertTime(time) {
        let d = new Date(time)
        return d.toString()
    }

    parseEventForSave(eventObj){
        const description= !eventObj.description ? null : eventObj.description;
        const venue_name= !eventObj.venue.name ? null : eventObj.venue.name;
        const long= !eventObj.venue.lon ? null : eventObj.venue.lon;
        const lat= !eventObj.venue.lat ? null : eventObj.venue.lat;
        const address= !eventObj.venue.address_1 ? null : eventObj.venue.address_1;
        const city= !eventObj.venue.city ? null : eventObj.venue.city;
        const country= !eventObj.venue.localized_country_name ? null :eventObj.venue.localized_country_name;
        const event_url= !eventObj.event_url ? null : eventObj.event_url;
        const name= !eventObj.name ? null : eventObj.name;
        const duration= !eventObj.duration ? null : eventObj.duration;
        const time= !eventObj.time ? null : this.convertTime(eventObj.time);
        const group_name= !eventObj.group.name ? null : eventObj.group.name;
        const group_who= !eventObj.group.who ? null : eventObj.group.who;
        const meetup_id= !eventObj.id ? null : eventObj.id;
        const photo_url= !eventObj.photo_url ? null : eventObj.photo_url;
        return { description: description, venue_name: venue_name, long: long, lat: lat, 
        address: address, city: city, country: country, event_url: event_url, name: name,
        duration: duration, time: time, group_name: group_name, group_who: group_who,
        meetup_id: meetup_id, photo_url: photo_url}
    }   




    saveEventToUser= (userId, event) => {
        console.log("event", event, "userid", userId,localStorage.getItem('token') )
        const data ={ user: { userId: userId, event: this.parseEventForSave(event)} }
        
        fetch(`http://localhost:3001/users/${userId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`
          },
        body: JSON.stringify(data)
    })
    .then(r => r.json())
    .then(userObj => this.setCurrentUser(userObj)) //this updates the user object to update showpage elements

    }

    render() {
        return (
        <div>
            <Navbar setUserId={this.setUserId} logOut={this.handleLogOut} fetchCurrentUser={this.fetchCurrentUserObj}/>
            <Search categories={this.categories} searchByCategory={this.fetchEventsByCategory}/>
            
            <div className="dataDisplayContainer">
                {this.showLoadingAnimation()}
                {this.state.selectedEvent ? 
                    <EventDisplay 
                        event={this.state.selectedEvent} 
                        closeDisplay={this.closeDisplay}
                        userId= {this.state.userId ? this.state.userId : null}
                        saveEventToUser= {this.state.userId ? this.saveEventToUser : null}
                    /> 
                      : 
                    null}
                {this.renderMapIfReady()}
            </div>

            {this.state.currentUser ? <UserShow currentUser ={this.state.currentUser} /> : null}
        </div>
    )
    }
}

export default MainDisplay;