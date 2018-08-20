import React from 'react'
import EventItem from '../components/EventItem';


const BASE_URL="http://localhost:3001/users/"
class UserShow extends React.Component{

    constructor(props){
        super(props)
        this.state ={
            user: props.currentUser
        }
    }

   

    render(){
        return (
        
         <React.Fragment>
             <p>User Show</p>
             <p>{this.state.user.first_name} {this.state.user.last_name}</p>
             {this.state.user ? this.state.user.events.map(event => <EventItem key={event.id} eventItem={event} removeEventFromUser={this.props.removeEventFromUser}/>) : null}
         </React.Fragment>   
        
        
    )
    }

}


export default UserShow