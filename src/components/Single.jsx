import React, { Component } from 'react'
import './single.css';
// import {reset} from 'redux-form';
import { Link } from 'react-router-dom'
// import InlineEdit from 'react-edit-inline';

export default class Single extends Component {
  constructor(props) {
    super(props)
    this.state = {};
     this.edit = this.edit.bind(this);
     this.destroy = this.destroy.bind(this);
     this.space = this.space.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
     this.refreshFeed = this.refreshFeed.bind(this);
  }

  space() {
    fetch(`/api/faves/${this.props.match.params.space_id}`)
            .then((response) => response.json())
            .then((post) => {
                this.setState({
                    post: post
                })
        })
        .catch((err) => console.log(err))

        this.refreshFeed();
  }

  refreshFeed() {
    fetch(`/api/feed`)
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
          e.persist();
          e.preventDefault();

        fetch(`/api/faves/${this.state.post.space_id}`, {
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

    handleSubmit(e){
      this.refs.editMe.value = '';
    }

    destroy() {
      fetch(`/api/faves/${this.state.post.space_id}`, {
            method: 'DELETE'
          })
        .then(() => console.log(this.state.post))
        .then(() => this.refreshFeed());
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
          <div className='body single'>
              <header>
                  <ul>
                      <li><i className="fa fa-camera" aria-hidden="true"></i></li>
                      <li className='logo'>Nasagram</li>
                     <Link to={`/user/1`}><li><i className="fas fa-user"></i></li></Link>
                  </ul>
              </header>
              <div class="container">
                  <img className='image' src={image} />
                  <div className='tab'>
                      <div>
                        <i className="fa fa-globe" aria-hidden="true"></i>
                        <h1><b>{user}</b> {description} </h1>
                      </div>
                      <br/>
                      <div className="action">
                        <input name="description" placeholder="Edit me!"
                        onChange={this.edit}
                        ref="editMe" />
                        <div onClick={this.handleSubmit}><i className="fas fa-pencil-alt"></i></div>
                        <br/>
                       <Link to={`/user/1`}><div onClick={() => this.destroy(this.props.location.state.id)}><i className="fas fa-times"></i></div></Link>
                       </div>
                  </div>
              </div>

              <Link to={`/user/1`}><footer><i className="fas fa-arrow-left"></i></footer></Link>
          </div>
      )
  }
}
