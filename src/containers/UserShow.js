import React from 'react'
import EventItem from '../components/EventItem';


const BASE_URL="http://localhost:3001/users/"
class UserShow extends React.Component{

    constructor({currentUser}){
        super({currentUser})
        this.state ={
            user: currentUser
        }
    }

    // componentDidMount(){
    //     fetch(BASE_URL + this.props.userId, {
    //         headers: {
    //             "Content-Type": "application/json",
    //             Accept: "application/json",
    //             Authorization: `Token ${localStorage.getItem("token")}`
    //           }
    //     })
    //     .then(r => r.json())
    //     .then(json => this.setState({ user: json}))   
    // }

    

    render(){
        return (
        
         <React.Fragment>
             <p>User Show</p>
             <p>{this.state.user.first_name} {this.state.user.last_name}</p>
             {this.state.user ? this.state.user.events.map(event => <EventItem key={event.id} eventItem={event}/>) : null}
         </React.Fragment>   
        
        
    )
    }

}


export default UserShow