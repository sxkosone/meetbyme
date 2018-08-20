import React, { Component } from 'react'
import { Menu, Form, Input, Button} from 'semantic-ui-react'


export default class Navbar extends Component {
  state = { 
      activeItem: 'home',
      username: '',
      password: '',
      firstName: '',
      lastName: '', 
      signUp: false
     
    }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleLogin= () => {
    const username = this.state.username;
    const password = this.state.password;
    this.userLogIn( username, password)
    this.setState(
      {username: '', password: ''})
  }

  //user signup

  setSignUp=()=>{
    this.setState({
      signUp: !this.state.signUp
    })
  }

  handleCreateUser = (e) =>{
    e.preventDefault()
    return fetch(`http://localhost:3001/users`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json"
      },
      body: JSON.stringify({user: {username: this.state.username, password: this.state.password, firstName: this.state.firstName, lastName: this.state.lastName}})
  })
  .then(r  => r.json())
  .then(json => json["success"] ? this.setLogedIn(json) : alert("Username has already been taken"))
  }

  setLogedIn =(json) =>{
    localStorage.setItem("token", `${json['token']}`);
    this.props.setUserId(json['user_id']);
    this.props.fetchCurrentUser(json['user_id'])
    this.setState({
      username: '',
      password: '',
      firstName: '',
      lastName: '', 
      signUp: false

    })

  }


  userLogIn = (username, password)=>{
    return fetch(`http://localhost:3001/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            Accept: "application/json"
        },
        body: JSON.stringify({user:{username: username, password: password}})
    })
    .then(r  => r.json())
    .then(json => json["success"] ? (localStorage.setItem("token", `${json['token']}`), this.props.setUserId(json['user_id']), this.props.fetchCurrentUser(json['user_id'])) : alert("Wrong username or password"))
}

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Item
            name='messages'
            active={activeItem === 'messages'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='friends'
            active={activeItem === 'friends'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position='right'>
              {this.state.signUp ? 
                
                <Form>
                    <Form.Field inline>
                      <label>UserName</label>
                      <Input placeholder='username' value={this.state.username} onChange={(e) => this.setState({ username: e.target.value})}/>
                      </Form.Field>
                    <Form.Field inline>
                      <label>Password</label>
                      <Input type="password" placeholder='password' value={this.state.password} onChange={(e) => this.setState({ password: e.target.value})}/>
                      </Form.Field>
                    <Form.Field inline>
                      <label>First Name</label>
                      <Input type="first_name" placeholder='first name' value={this.state.firstName} onChange={(e) => this.setState({ firstName: e.target.value})}/>
                    </Form.Field>
                    <Form.Field inline>
                      <label>Last Name</label>
                      <Input type="last_name" placeholder='last name' value={this.state.lastName} onChange={(e) => this.setState({ lastName: e.target.value})}/>
                    </Form.Field>
                    <Button onClick={this.handleCreateUser}>Create User</Button>
                </Form> 
                : 
                  
                <Button onClick={this.setSignUp}>Create an account</Button>
                
              }
           
                <Form>
                    <Form.Field inline>
                    <label>UserName</label>
                    <Input placeholder='username' value={this.state.username} onChange={(e) => this.setState({ username: e.target.value})}/>
                    </Form.Field>
                    <Form.Field inline>
                    <label>Password</label>
                    <Input type="password" placeholder='password' value={this.state.password} onChange={(e) => this.setState({ password: e.target.value})}/>
                    </Form.Field>
                    <Button onClick={this.handleLogin}>LogIn</Button>
                </Form>
            
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={this.props.logOut}
            />
          </Menu.Menu>
        </Menu>

      
      </div>
    )
  }
}
