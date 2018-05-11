import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Public      from './Public';
import UserAPI     from './UserAPI';
import Login       from './Login';
import Single      from './Single';
import UserProfile from './UserProfile';
import Register    from './Register';


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {};

    this.checkToken = this.checkToken.bind(this);
  }

  checkToken() {
        debugger;
        const authToken = localStorage.getItem('authToken');
        fetch('/register', {
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

  render(){
      return (
          <div><Switch>
                  <Route exact path='/user/1/api' component={UserAPI} />
                  <Route exact path='/space/:space_id' component={Single} />
                  <Route exact path='/user/1' component={UserProfile} />
                  <Route exact path='/user' component={Login} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/' component={Public} />
              </Switch></div>
      )
  }
}
