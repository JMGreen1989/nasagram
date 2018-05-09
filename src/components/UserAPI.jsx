import React, { Component } from 'react';
import './UserAPI.css';
import Dropzone from 'react-dropzone'

export default class UserAPI extends Component {
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

    componentWillMount(){
        fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=k5NtPxObjn5al0hbRRl2cnx1KVQot2JOJxY0NqJH`)
          .then(data => data.json())
          .then(json => this.setState({api: json.photos}))
          .catch(err => console.log(err))
    }

    render(){

        let images = this.state.files.map((photo, i) => (
            <img key={i} src={photo}/>
        ))

        if(this.state.files.length > 0){
            console.log(this.state.files)
        }

        if(this.state.api) {
            const crop = this.state.api.splice(0,10);
            var item = crop.map((item, i) => {
                return (
                    <div key={i} className='public_api'>
                        <i className="fa fa-globe" aria-hidden="true"></i>
                            <h2>Nasa's API</h2>
                            <h4>leveraging open data</h4>
                        <img src={item.img_src}/>
                        <i className="fas fa-heart"></i>
                        <h3><b>{item.camera.name}</b> {item.camera.full_name}</h3>
                    </div>
                )
            })
        }

        return (
            <div className='body'>

                <header>
                    <ul>
                        <li><i className="fa fa-camera" aria-hidden="true"></i></li>
                        <li className='logo'>Nasagram</li>
                        <li><i className="fas fa-user"></i> <i className="fas fa-address-card"></i></li>
                    </ul>
                </header>

                <span className='dropzone'>
                    <i className="fa fa-globe" aria-hidden="true"></i>
                    <h2>Nasa's API</h2>
                    <Dropzone onDrop={this.onDrop.bind(this)}>
                        <p>Drag and drop your images here</p>
                    </Dropzone>
                    <h5>Important notice<br/>We would like to give design<br/>credit to Instagram ®</h5>
                </span>

                <section>
                    {item}
                </section>

            </div>
        )
    }
}
