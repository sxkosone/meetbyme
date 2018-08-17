import React from 'react'
import EventItem from '../components/EventItem';


const BASE_URL="http://localhost:3001/users/"
class UserShow extends React.Component{

    constructor(props){
        super(props)
        this.state ={
            user: null
        }
    }

    componentDidMount(){
        fetch(BASE_URL + this.props.userId, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem("token")}`
              }
        })
        .then(r => r.json())
        .then(json => this.setState({ user: json}))   
    }

    render(){
        return (
        
         <React.Fragment>
             <p>User Show</p>
             {this.state.user ? this.state.user.events.map(event => <EventItem key={event.id} eventItem={event}/>) : null}
         </React.Fragment>   
        
        
    )
    }

}


export default UserShow