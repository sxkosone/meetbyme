import React from 'react';
import { Container, Button, Popup, Image } from 'semantic-ui-react'

const PLACEHOLDER_IMG="http://s3shopback.s3-ap-southeast-1.amazonaws.com/my/wp-content/uploads/2015/03/happy-party.jpg"

const EventDisplay = ({event, closeDisplay, saveEventToUser}) => {

    function convertTime() {
        let d = new Date(event.time)
        const date = d.toDateString()
        const hours = d.getHours()
        const minutes = d.getMinutes()
        return `${hours}:${minutes > 10? minutes : "0" + minutes} on ${date}`
    }
    
    return (
            <Container className="event-container">
                <Button secondary onClick={closeDisplay}>Close</Button>
                {localStorage.getItem("token") ? <Popup trigger={<Button color="green" onClick={() => saveEventToUser(event)} >Save Event</Button>} content="Saved!" on="click"/> : null}
                <h2>{event.name}</h2>
                <Image src={event.photo_url ? event.photo_url : PLACEHOLDER_IMG} fluid />
                <p>{convertTime()}</p>
                <p><strong>{event.venue.address_1}</strong></p>
                <p>{event.description}</p>
            </Container>
        )
    
}

export default EventDisplay;

