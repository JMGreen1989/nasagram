import React, { Component } from 'react'
import './single.css';
// import { Link } from 'react-router-dom'
// import InlineEdit from 'react-edit-inline';

export default class Single extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // description: ''
    };
     this.edit = this.edit.bind(this);
     this.destroy = this.destroy.bind(this);
     this.space = this.space.bind(this);
  }

  space() {
    fetch(`/space/6`)
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

    componentWillMount() {
        this.space();
    }

        edit(e) {
          // debugger;
          e.persist()
          e.preventDefault();
        fetch(`/space/${this.state.post.space_id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'image': this.state.post.image,
                'description': e.target.value
            })
             })
        .then(() => this.setState({
          description: e.target.value
        }))
        .then(() => this.space());
    }

    destroy() {
      fetch(`/space/${this.state.post.space_id}`, {
            method: 'DELETE'
          })
        .then(() => console.log(this.state.post));
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
                        <input name="description" placeholder="edit me"
                        onChange={this.edit}/>
                        <div onClick={this.edit}><i className="fas fa-pencil-alt"></i></div>
                        <br/>
                       <div onClick={this.destroy}><i className="fas fa-times"></i></div>
                  </div>
              </div>

              <footer><i className="fas fa-arrow-left"></i></footer>
          </div>
      )
  }
}
