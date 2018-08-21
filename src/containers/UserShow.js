import React from 'react'
import EventItem from '../components/EventItem';


//changed to functional
// const UserShow = (props) =>
  
//          <React.Fragment>
//              <p>User Show</p>
//              <p>{props.currentUser.first_name} {props.currentUser.last_name}</p>
//              {props.currentUser ? props.currentUser.events.map(event => <EventItem key={event.id} eventItem={event} removeEventFromUser={props.removeEventFromUser}/>) : null}
//          </React.Fragment>   

// export default UserShow

const BASE_USER_URL="http://localhost:3001/users/"

class UserShow extends React.Component{

        constructor(props){
            super(props)
            this.state ={
                user: null
            }
        }
    

        componentDidMount(){
                fetch(BASE_USER_URL + "current-user", {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Token ${localStorage.getItem("token")}`
                      }
                })
                .then(r => r.json())
                .then(userObj => this.setState({user: userObj}))
            
        }
        render(){
           if( this.state.user){
            return <React.Fragment>
                        <p>User Show</p>
                        <p>{this.state.user.first_name} {this.state.user.last_name}</p>
                        {this.state.user.events.map(event => <EventItem key={event.id} eventItem={event} removeEventFromUser={this.props.removeEventFromUser}/>)}
                    </React.Fragment>  
           }else{
               return  <h1>Please log in to view your events</h1>
            }     
        }
    
    }
    
    
    export default UserShow