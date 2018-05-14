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
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
        username: this.username.value,
        password: this.password.value
        });
    }

    handleSubmit(e) {
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
        // .then(() => console.log(response, ' im the response'))
        // .then(({data: {token}}) => console.log(token, ' im the response from than handle submit'))
        .then(() => {
            this.props.history.push(`/feed`)
        })
        .catch(err => {console.log(err)})
    }

    render(){
      return(
          <div className="body login">
              <div className="container">
                  <h1 className="new">Nasagram</h1>
                  <p>Login to see your personal feed of images from Nasa</p>
                  <form onSubmit={this.handleSubmit}>
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
