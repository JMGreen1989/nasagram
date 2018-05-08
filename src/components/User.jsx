import React, { Component } from 'react'

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {}

  }

  render(){
      return (
          <div className="sign_in">
          <h1>Sign in here</h1>
          <div className="sign_in_container">
                <img src='https://images.unsplash.com/photo-1446776858070-70c3d5ed6758?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9b43c5c75516f6ad53f828bd14cbd354&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb'/>
              <form className="" action="index.html" method="post">
                  <input value="username" placeholder="username"/>
                  <br/>
                  <input value="password" placeholder="password"/>
                  <br/>
                  <button><i className="fas fa-share-square"></i></button>
              </form>
          </div>
          </div>
      )
  }
}

export default User
