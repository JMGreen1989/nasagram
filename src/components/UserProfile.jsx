import React, { Component } from 'react';
import './userProfile.css';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router-dom';
import Single from './Single.jsx';

export default class UserProfile extends Component {
    constructor(props){
        super(props)
        this.state={
            files: []
        }

        this.getUser = this.getUser.bind(this);

    }

    onDrop(files) {
        const formatedFiles = []
        files.forEach(file => formatedFiles.push(URL.createObjectURL(file)))
        this.setState({
          files: formatedFiles
        });

        fetch('/user/1', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'image': formatedFiles[0],
                'description': 'add a custom caption here'
            })
        })
        .then((response) => console.log(response))
        .then(() => this.getUser())
    }

    componentWillMount() {
        this.getUser();
    }

    componentDidMount() {
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


    render(){

        if(this.state.user){
            var name = this.state.user[0].username
           console.log(this.state.user)
           var post = this.state.user.map((elem, i) => (
               <div key={i} className="container">
                   <img className="image" src={elem.image}/>
                   <div className="description">
                       {elem.description}
                       <Link to={{
                            pathname: `/space/${elem.space_id}`,
                            state: {
                                image: elem.image,
                                description: elem.description,
                                space_id: elem.space_id,

                            }

                            }}>
                            <i className="fas fa-eye"></i></Link>
                   </div>
               </div>
           ))
       }

        return (
            <div className='body user_profile'>
                <header>
                    <ul>
                        <li><i className="fa fa-camera" aria-hidden="true"></i></li>
                        <li className='logo'>Nasagram</li>
                        <Link to={`/user/1/api`}><li><i className="fas fa-search"></i></li></Link>
                    </ul>
                </header>
                <div className="profile">
                    <ul>
                        <li>
                            <i className="fa fa-globe" aria-hidden="true"></i>
                        </li>
                        <li className='username'>
                            <h1>{name}</h1>
                            <h2>Your saved articles from Nasa's Database</h2>
                        </li>
                        <li>
                            <span className='dropzone'>
                                <Dropzone onDrop={this.onDrop.bind(this)}>
                                    <p>Drag and drop your images here</p>
                                </Dropzone>
                            </span>
                        </li>
                    </ul>
                </div>

                <div className="saved">
                    {post}
                </div>

                <h5>Thank you for visiting Nasagram ®<br/>Important notice we would like to give design credit to Instagram ®</h5>
            </div>
        )
    }
}
