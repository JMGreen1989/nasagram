import React from 'react'
import './login.css';

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {};

        this.loginUser = this.loginUser.bind(this);
    }

    loginUser(e){
        e.preventDefault();
        fetch('/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'username': this.username.value,
                'password': this.password.value
            })
        })
        .then(() => console.log(this.username.value));
    }

    render(){
        return(
            <div className="body">
                <div className="container">
                    <h1 className="new">Nasagram</h1>
                    <p>Login to see your personal feed of images from Nasa</p>
                    <form onSubmit={this.loginUser}>
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
