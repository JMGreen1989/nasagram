import React from 'react';
import './login.css';
import jwt from 'jwt-js';
import jwtDecode from 'jwt-decode';
import login from '../Service';
import { Link } from 'react-router-dom';

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            currentUser: null
        };

        this.checkStatus = this.checkStatus.bind(this);
        this.saveToken = this.saveToken.bind(this);
        this.login = this.login.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handSubmit = this.handSubmit.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }


  checkStatus(resp) {
    if (!resp.ok) throw new Error(resp.statusMessage);
    return resp.json();
  }

  saveToken(respBody) {
    localStorage.setItem('authToken', respBody.token)
    const user = jwtDecode(respBody.token);
    return user;
  }

  // Auth requests

  login(creds) {
    console.log('this is creds in Login.jsx', creds)
    fetch('/user', {
      method: 'POST',
      body: JSON.stringify(creds),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(() => this.checkStatus())
    .then(() => this.saveToken())
  }

      handleInputChange(e) {
      // const { username, value } = e.target;
      this.setState({
        username: this.username.value,
        password: this.password.value
      });
    }

  handSubmit(e) {
    e.preventDefault();
    fetch('/user', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        username: this.username.value,
        password: this.password.value
      })
    })
    .then(() => this.checkStatus())
    .then(() => this.saveToken())
    .then(() => this.handleLogin())

  }

  handleLogin(creds) {
    this.login(creds)
      .then(user => this.setState({currentUser: user}));
      console.log('this is the currentUser:', currentUser)
  }

    render(){
      return(
          <div className="body">
              <div className="container">
                  <h1 className="new">Nasagram</h1>
                  <p>Login to see your personal feed of images from Nasa</p>
                  <form onSubmit={this.handSubmit}>
                      <input name="username" type="text" placeholder="Username"
                      ref={(ref) => {this.username = ref}} />
                      <br/>
                      <input name="password" type="password" placeholder="Password"
                      ref={(ref) => {this.password = ref}}/>
                      <br/>
                      <button type="submit">Sign in</button>
                  </form>
                  <Link to="register"><p>Dont have an account? Register Here</p></Link>
              </div>
          </div>
      )

    }
}
