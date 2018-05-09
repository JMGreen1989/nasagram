import React, { Component } from 'react';
import './userProfile.css';
import Dropzone from 'react-dropzone'

export default class UserProfile extends Component {
    constructor(props){
        super(props)
        this.state={
            files: []
        }
    }

    onDrop(files) {
        const formatedFiles = []
        files.forEach(file => formatedFiles.push(URL.createObjectURL(file)))
        this.setState({
          files: formatedFiles
        });
    }

    componentWillMount() {
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

        let images = this.state.files.map((photo, i) => (
            <img key={i} src={photo}/>
        ))

        if(this.state.files.length > 0){
            console.log(this.state.files)
        }

        if(this.state.user){
            console.log(this.state.user)
            var post = this.state.user.map((elem, i) => (
                <div className="container">
                    <i className="fas fa-eye"></i>
                    <img className="image" src={elem.image}/>
                    <div className="description">{elem.description}</div>
                </div>
            ))
        }

        return (
            <div className='body'>
                <header>
                    <ul>
                        <li><i className="fa fa-camera" aria-hidden="true"></i></li>
                        <li className='logo'>Nasagram</li>
                        <li><i className="fas fa-user"></i><i className="fas fa-search"></i></li>
                    </ul>
                </header>

                <div className="profile">
                    <ul>
                        <li>
                            <i className="fa fa-globe" aria-hidden="true"></i>
                        </li>
                        <li className='username'>
                            <h1>Username</h1>
                            <h2>Saved articles from Nasa's Database</h2>
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
