import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Public      from './Public';
import UserAPI     from './UserAPI';
import Login       from './Login';
import Single      from './Single';
import UserProfile from './UserProfile';
import Register    from './Register';


export default function App () {
      return (
          <div>
            <Switch>
                  <Route exact path='/myFaves/:space_id' component={Single} />
                  <Route exact path='/myFaves' component={UserProfile} />
                  <Route exact path='/feed' component={UserAPI} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/' component={Public} />
              </Switch>
            </div>
      )
}
