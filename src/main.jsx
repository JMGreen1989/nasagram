/* eslint-env browser */
import React           from 'react';
import ReactDOM        from 'react-dom';
import fontawesome     from '@fortawesome/fontawesome';
import brands          from '@fortawesome/fontawesome-free-brands';
import solid           from '@fortawesome/fontawesome-free-solid';
import 'bulma/bulma.sass';

import App from './components/App';
import Public from './components/Public';
import UserAPI from './components/UserAPI';
import Login from './components/Login';
import Single from './components/Single';
import UserProfile from './components/UserProfile';
import Register from './components/Register';

fontawesome.library.add(brands, solid);

// mount our App at #container
ReactDOM.render(<Single />, document.querySelector('#container'));
