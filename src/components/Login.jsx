import React from 'react'
import './login.css';
import jwt from 'jwt-js';

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        };


        this.handleInputChange = this.handleInputChange.bind(this);
        this.handSubmit = this.handSubmit.bind(this);
    }

    handleInputChange(e) {
    const { username, value } = e.target;
    this.setState({
      [username]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onLogin(this.state);
    this.setState({
      username: '',
      password: ''
    });
  }

    render(){
      return(
          <div className="body">
              <div className="container">
                  <h1 className="new">Nasagram</h1>
                  <p>Login to see your personal feed of images from Nasa</p>
                  <form onSubmit={this.handSubmit}>
                      <input name="username" type="text" placeholder="Username"
                      onChange={this.handleInputChange}
                      value={this.state.username} />
                      <br/>
                      <input name="password" type="password" placeholder="Password"
                      onChange={this.handleInputChange}
                      value={this.state.password}/>
                      <br/>
                      <button type="submit">Sign in</button>
                  </form>
                  <p>Dont have an account? Register Here</p>
              </div>
          </div>
      )

    }
}
