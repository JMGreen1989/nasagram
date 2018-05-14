import React from 'react';
import './login.css';
import { Link } from 'react-router-dom';

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            currentUser: null
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handSubmit = this.handSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
        username: this.username.value,
        password: this.password.value
        });
    }

    handSubmit(e) {
        e.preventDefault();
        fetch('/auth', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'username': this.username.value,
                'password': this.password.value
            })
        })
        .then((response) => response.json())
        .then(({data: {token}}) => console.log(token, ' im the response from than handle submit'))
        .catch(err => {console.log('fetch in handleSubmit failed, see login.js')})
    }

    render(){
      return(
          <div className="body login">
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
