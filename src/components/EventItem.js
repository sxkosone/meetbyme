import React from 'react'
import { Item, Button } from 'semantic-ui-react'

const PLACEHOLDER_IMG="http://s3shopback.s3-ap-southeast-1.amazonaws.com/my/wp-content/uploads/2015/03/happy-party.jpg"

function convertTime(et) {
  let d = new Date(et)
  return d.toString()
}

//-----Note this event is from the DB not from Meetups
const EventItem = ({eventItem, removeEventFromUser}) =>

<Item>
      <Item.Image size='tiny' src={eventItem.photo_url ? eventItem.photo_url : PLACEHOLDER_IMG} />
      <Button onClick={() => removeEventFromUser(eventItem)}>Remove from your list</Button>

      <Item.Content>
        <Item.Header as='a'>{!eventItem.name ? null:eventItem.name}</Item.Header>
        <Item.Meta>Description</Item.Meta>
        <Item.Description>
          <p>{!eventItem.description ? null : eventItem.description}</p>
        </Item.Description>
        <Item.Extra>Time: {!eventItem.time ? null : eventItem.time} </Item.Extra>
        <Item.Extra>Duration: {!eventItem.duration ? null : convertTime(eventItem.duration)} </Item.Extra>
        <Item.Extra>Loctation {!eventItem.address ? null : eventItem.address}, {!eventItem.city ? null : eventItem.city} </Item.Extra>
        <a href={eventItem.event_url} target="_blank">View Meetup Page</a>
      </Item.Content>
</Item>


export default EventItem


 