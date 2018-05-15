import React from 'react'
import './register.css';
import { Redirect, Link } from 'react-router-dom';

export default class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
        };

        this.register = this.register.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    register(e){
        e.preventDefault();
        fetch('/auth/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'username': this.state.username,
                'password': this.state.password,
            })
        })
        .then(() => {
            this.props.history.push(`/login`)
        });
    }

    handlePassword(event) {
        this.setState({ password: event.target.value })
    }

    handleUsername(event){
        this.setState({ username: event.target.value })
    }


    render(){
        return (
            <div className="body register">
                <div className="container">
                    <h1 className="new">Nasagram</h1>
                    <p>Sign up to see photos from Nasa</p>
                    <form onSubmit={this.register}>
                        <input name="username" type="text" placeholder="Username"
                        onChange={this.handleUsername}/>
                        <br/>
                        <input name="password" type="text" placeholder="Password"
                        onChange={this.handlePassword}/>
                        <br/>
                        <button type="submit" >Register</button>
                    </form>
                    <Link to="/login"><p>Have an account? Login in</p></Link>
                </div>
            </div>
        )
    }
}
