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
    }

  render(){

      if(this.state.post){
          console.log(this.state.post)
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
                <div className='image'></div>
                <div className='tab'></div>
              </div>


              <footer><i className="fas fa-arrow-left"></i></footer>
          </div>
      )
  }
}


// <ul>
//     <li><p className='description'>description</p></li>
//     <li><i className="fas fa-times"></i></li>
//     <li><i className="fas fa-pencil-alt"></i></li>
// </ul>
