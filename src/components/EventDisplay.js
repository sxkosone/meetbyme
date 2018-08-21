import React from 'react';
import { Container, Button, Icon, Image } from 'semantic-ui-react'

const PLACEHOLDER_IMG="http://s3shopback.s3-ap-southeast-1.amazonaws.com/my/wp-content/uploads/2015/03/happy-party.jpg"

const EventDisplay = ({event, closeDisplay, saveEventToUser}) => {

    function convertTime() {
        let d = new Date(event.time)
        return d.toString()
    }
    
    return (
            <Container className="event-container">
                <Button icon onClick={closeDisplay}><Icon name='window close' /></Button>
                {localStorage.getItem("token") ? <Button onClick={() => saveEventToUser(event)} >Save Event</Button> : null}
                <h2>{event.name}</h2>
                <Image src={event.photo_url ? event.photo_url : PLACEHOLDER_IMG} fluid />
                <p>{convertTime()}</p>
                <p>{event.description.slice(0, 140)}</p>
                <p>{event.venue.address_1}</p>
                
            </Container>
        )
    
}

export default EventDisplay;

