import React, { Component } from 'react'
import './single.css';

export default class Single extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

    componentWillMount() {
        fetch(`/user/1/4`)
            .then((response) => response.json())
            .then((post) => {
                this.setState({
                    post: post
                })
        })
        .catch((err) => console.log(err))

        fetch(`/user/1`)
            .then((response) => response.json())
            .then((user) => {
                this.setState({
                    user: user
                })
        })
        .catch((err) => console.log(err))
    }

  render(){

      if(this.state.user){
        var user = this.state.user[0].username
      }

      if(this.state.post){
          var image = this.state.post.image
          var description = this.state.post.description
      }

      return (
          <div className='body'>
              <header>
                  <ul>
                      <li><i className="fa fa-camera" aria-hidden="true"></i></li>
                      <li className='logo'>Nasagram</li>
                      <li><i className="fas fa-user"></i></li>
                  </ul>
              </header>

              <div className='single'>
                  <img className='image' src={image} />
                  <div className='tab'>
                        <i className="fa fa-globe" aria-hidden="true"></i>
                        <h1>{user}</h1>
                        <h2>{description}</h2>
                        <input placeholder="edit me"/><i className="fas fa-pencil-alt"></i>
                        <i className="fas fa-times"></i>
                  </div>
              </div>

              <footer><i className="fas fa-arrow-left"></i></footer>
          </div>
      )
  }
}
