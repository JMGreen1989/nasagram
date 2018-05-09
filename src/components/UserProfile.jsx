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

    render(){

        let images = this.state.files.map((photo, i) => (
            <img key={i} src={photo}/>
        ))

        if(this.state.files.length > 0){
            console.log(this.state.files)
        }

        return (
            <div className='body'>
                <header>
                    <ul>
                        <li><i className="fa fa-camera" aria-hidden="true"></i></li>
                        <li className='logo'>Nasagram</li>
                        <li><i className="fas fa-user"></i><i class="fas fa-search"></i></li>
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
                        <div className="container">
                            <div className="image"></div>
                            <div className="description">description</div>
                            <i class="fas fa-eye"></i>
                        </div>
                        <div className="container">
                            <div className="image"></div>
                            <div className="description">description</div>
                            <i class="fas fa-eye"></i>
                        </div>
                        <div className="container">
                            <div className="image"></div>
                            <div className="description">description</div>
                            <i class="fas fa-eye"></i>
                        </div>
                        <div className="container">
                            <div className="image"></div>
                            <div className="description">description</div>
                            <i class="fas fa-eye"></i>
                        </div>
                        <div className="container">
                            <div className="image"></div>
                            <div className="description">description</div>
                            <i class="fas fa-eye"></i>
                        </div>
                        <div className="container">
                            <div className="image"></div>
                            <div className="description">description</div>
                            <i class="fas fa-eye"></i>
                        </div>
                </div>

                <h5>Thank you for visiting Nasagram ®<br/>Important notice we would like to give design credit to Instagram ®</h5>
            </div>
        )
    }
}
