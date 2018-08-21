import React from 'react';
import MapDoc from '../components/MapDoc';
import Search from '../components/Search';
import EventDisplay from '../components/EventDisplay'
import '../index.css'
import { Dimmer, Loader } from 'semantic-ui-react'
import Navbar from './Navbar'
import UserShow from './UserShow'
import { Route } from 'react-router-dom'


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
    //get User location from browser and get events
    this.getUserLocationAndFetchEvents()
    //get all catagories from Meetup
    this.fetchAllCategories()     
}


//------fetch methods


fetchInitialEvents = (lat, long) => {
    //returns a promise that holds the results of our API call to MEETUP
    return fetch(`${BASE_URL}?lat=${lat}&long=${long}`).then(r => r.json())   
}

fetchAllCategories = () => {
    const allCategories={name: "All categories", sort_name: "All Categories", id: 0, shortname: "All"}
    fetch(BASE_URL+"/categories")
    .then(r => r.json())
    .then(data => this.categories=[allCategories, data])//look at this later
}

fetchEventsByCategory = (categoryId) => {
    //should I change state back to loading: true
    fetch(`${BASE_URL}?lat=${this.state.lat}&long=${this.state.long}&category=${categoryId}`).then(r => r.json())
    .then(response => {
        this.setState({
            events:response
        })
    })
}


    fetchInitialEvents = (lat, long) => {
        //returns a promise that holds the results of our API call to MEETUP
        return fetch(`${BASE_URL}?lat=${lat}&long=${long}&radius=5`).then(r => r.json())
        
    }
handleUserEventSearch = (searchTerm, categoryId) => {
    fetch(`${BASE_URL}?lat=${this.state.lat}&long=${this.state.long}&text=${searchTerm}&category=${categoryId}`).then(r => r.json())
    .then(response => {
        this.setState({
            events:response
        })
    })
}

fetchCurrentUserObj = (userId) =>{
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


removeEventFromUser = (eventObj) =>{
    console.log (eventObj)
    const userId = this.state.userId
    const data ={ user: { userId: userId, event: eventObj, removeEvent: true} }
    
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
.then(userObj => this.setCurrentUser(userObj))
}

saveEventToUser= (userId, event) => {
    const data ={ user: { userId: userId, event: this.parseEventForSave(event), removeEvent: false} }
    
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


handleUserEventSearch = (searchTerm, categoryId, radius) => {
    console.log("searching with", searchTerm, "and category", categoryId)
    fetch(`${BASE_URL}?lat=${this.state.lat}&long=${this.state.long}&radius=${radius}&text=${searchTerm}&category=${categoryId}`).then(r => r.json())
    .then(response => {
        console.log(response)
        this.setState({
            events:response
        })
    })
}


//---state settting methods

    
    setUserId= (userId) =>{
        this.setState({userId: userId})
    }

    //clears current user and local storage
    handleLogOut = () =>{
        localStorage.clear()
        this.setState({
            userId: null,
            currentUser: null
        })
    }

    //sets selected Event based on map click
    selectEventForDisplay = (e, eventObj) => {
        this.setState({
            selectedEvent: eventObj
        })
    }
    //removes selected Event
    closeDisplay = () => {
        this.setState({
            selectedEvent: null
        })
    }

    //sets popup on hover over map point
    focusOnEvent = (eventObj) => {
        let newVal = this.state.popupEvent ? null : eventObj
        this.setState({
            popupEvent: newVal
        })
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
//--render helpers 

    renderMapIfReady() {
        return !this.state.loading ? <MapDoc 
        long={this.state.long} 
        lat={this.state.lat} 
        events={this.state.events.results} 
        selectEventForDisplay={this.selectEventForDisplay}
        popUpEvent={this.state.popupEvent}
        togglePopUpFocus={this.focusOnEvent}/> : null
    }


//----Data formating methods

    //manages Date Time for display and DB persistance (work around for large number issues with DB)
    convertTime(time) {
        let d = new Date(time)
        return d.toString()
    }

    //takes data from Meetup Json structure and formats it for DB persistance
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



    render() {
        return (
        <div>
            <Navbar 
                setUserId={this.setUserId} 
                logOut={this.handleLogOut} 
                fetchCurrentUser={this.fetchCurrentUserObj}
                currentUser={this.state.currentUser}
            />
            
            <Route exact path="/" render= {() => {
                return(
                    <React.Fragment>
                            <Search 
                                categories={this.categories} 
                                // searchByCategory={this.fetchEventsByCategory}
                                handleUserEventSearch={this.handleUserEventSearch}/>
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
                    </React.Fragment>
                )} } 
                /> 
                <Route exact path="/my-events" render ={() =>{
                    if(localStorage.getItem('token')){
                    return(
                    <UserShow removeEventFromUser={this.removeEventFromUser}/> 
                )}else{
                   return <h1>Please log in to view your events</h1>
                }
            
                }}/>


        </div>
    )
    }
}

export default MainDisplay;