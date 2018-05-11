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
     this.getUser = this.getUser.bind(this);
  }

  space() {
    // fetch(`/space/1`)
    console.log('this is props', this.props);
    fetch(`/space/${this.props.match.params.space_id}`)
            .then((response) => response.json())
            .then((post) => {
                this.setState({
                    post: post
                })
        })
        .catch((err) => console.log(err))

        this.getUser();
  }

  getUser() {
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
          e.persist();
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

    handleSubmit(e){
      this.refs.editMe.value = '';
    }

    destroy() {
      fetch(`/space/${this.state.post.space_id}`, {
            method: 'DELETE'
          })
        // .then(() => console.log(this.state.post))
        .then(() => this.getUser());;
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
                     <Link to={`/user/1`}><li><i className="fas fa-user"></i></li></Link>
                  </ul>
              </header>
              <div className='single'>
                  <img className='image' src={image} />
                  <div className='tab'>
                      <div>
                        <i className="fa fa-globe" aria-hidden="true"></i>
                        <h1><b>{user}</b> {description} </h1>
                      </div>

                        <input name="description" placeholder="Edit me!"
                        onChange={this.edit}
                        ref="editMe" />
                        <div onClick={this.handleSubmit}><i className="fas fa-pencil-alt"></i></div>
                        <br/>
                       <Link to={`/user/1`}><div onClick={() => this.destroy(this.props.location.state.id)}><i className="fas fa-times"></i></div></Link>
                  </div>
              </div>

              <footer><i className="fas fa-arrow-left"></i></footer>
          </div>
      )
  }
}


