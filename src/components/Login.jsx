import React from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

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
        this.checkStatus = this.checkStatus.bind(this);
        this.saveToken = this.saveToken.bind(this);
        this.passingToken = this.passingToken.bind(this);
    }

    saveToken(respBody) {
        localStorage.setItem('authToken', respBody.token)
        const user = jwtDecode(respBody.token);
        console.log('this is the user in saveToken', user)
        return user;
    }

    passingToken(){
        var token = localStorage.getItem('authToken')
        fetch('/api/token', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                       'Authorization': 'Bearer' + token},
            body: JSON.stringify({
                'username': token
            })
        })
    }

    checkStatus(resp) {
        if (!resp.ok) throw new Error(resp.statusMessage);
        return resp.json();
  }

    handleInputChange(e) {
        this.setState({
        username: this.username.value,
        password: this.password.value
        });
    }

    handleSubmit(e) {
        var token = localStorage.getItem('authToken')
        e.preventDefault();
        fetch('/auth', {
            method: 'POST',
             headers: {'Content-Type': 'application/json',
                       'Authorization': 'Bearer' + token },
            body: JSON.stringify({
                'username': this.username.value,
                'password': this.password.value,
            })
        })
        .then(this.checkStatus)
        .then(this.saveToken)
        .then(this.passingToken)

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
                  <Link to="/register"><p>Dont have an account? Register Here</p></Link>
              </div>
          </div>
      )

    }
}
