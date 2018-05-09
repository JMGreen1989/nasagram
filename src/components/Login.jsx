import React from 'react'


class Login extends React.Component {
  constructor(props) {
  super(props)
  this.state = {};
  this.loginUser = this.loginUser.bind(this);
}


  loginUser(e){
    e.preventDefault();
    fetch('/user', {
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
      <form onSubmit={this.loginUser}>
        <input name="username" type="text" placeholder="Username"
         ref={(ref) => {this.username = ref}} />
        <br/>
        <input name="password" type="text" placeholder="Password"
        ref={(ref) => {this.password = ref}}/>
        <br/>
        <button type="submit">Login</button>
      </form>
      )

}
}


export default Login
