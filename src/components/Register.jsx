import React from 'react'


export default class Register extends React.Component {
  constructor(props) {
  super(props)
  this.state = {};
  this.register = this.register.bind(this);
}


  register(e){
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
      <form onSubmit={this.register}>
        <input name="username" type="text" placeholder="Username"
         ref={(ref) => {this.username = ref}} />
        <br/>
        <input name="password" type="text" placeholder="Password"
        ref={(ref) => {this.password = ref}}/>
        <br/>
        <button type="submit">Register</button>
      </form>
      )

}
}
