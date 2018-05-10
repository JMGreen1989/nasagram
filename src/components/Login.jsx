import React from 'react'
import './login.css';

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: null
        };

        this.checkToken = this.checkToken.bind(this)
    }

    checkToken() {
        debugger;
        const authToken = localStorage.getItem('authToken');
        fetch('/user', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then(resp => {
            if (!resp.ok) throw new Error(resp.message);
                return resp.json()
        })
        .then(respBody => {
            this.setState({
                currentUser: respBody.user
            })
        })
        .catch(err => {
            console.log('not logged in');
            localStorage.removeItem('authToken');
            this.setState({
                currentUser: null
            });
        })
    }

    // componentDidMount() {
    //     this.checkToken();
    // }

    render(){
      return(
          <div className="body">
              <div className="container">
                  <h1 className="new">Nasagram</h1>
                  <p>Login to see your personal feed of images from Nasa</p>
                  <form onSubmit={this.checkToken}>
                      <input name="username" type="text" placeholder="Username"
                      ref={(ref) => {this.username = ref}} />
                      <br/>
                      <input name="password" type="text" placeholder="Password"
                      ref={(ref) => {this.password = ref}}/>
                      <br/>
                      <button type="submit">Sign in</button>
                  </form>
                  <p>Dont have an account? Register Here</p>
              </div>
          </div>
      )

    }
}
