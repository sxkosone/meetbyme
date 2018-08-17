import React, { Component } from 'react'
import { Menu, Form, Input, Button} from 'semantic-ui-react'


export default class Navbar extends Component {
  state = { 
      activeItem: 'home',
      username: '',
      password: ''
     
    }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })


  userLogIn = ()=>{
    return fetch(`http://localhost:3001/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            Accept: "application/json"
        },
        body: JSON.stringify({username: this.state.username, password: this.state.password})
    })
    .then(r  => r.json())
    .then(json => json["success"] ? (localStorage.setItem("token", `${json['token']}`), this.props.setUserId(json['user_id'])) : alert("Wrong username or password"))
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
           
                <Form>
                    <Form.Field inline>
                    <label>UserName</label>
                    <Input placeholder='username' onChange={(e) => this.setState({ username: e.target.value})}/>
                    </Form.Field>
                    <Form.Field inline>
                    <label>Password</label>
                    <Input type="password" placeholder='password' onChange={(e) => this.setState({ password: e.target.value})}/>
                    </Form.Field>
                    <Button onClick={this.userLogIn}>LogIn</Button>
                </Form>
            
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>

      
      </div>
    )
  }
}
