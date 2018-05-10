import React, { Component } from 'react';
import './userAPI.css';

export default class UserAPI extends Component {
    constructor(props){
        super(props)
        this.state={}

        this.save = this.save.bind(this);
        // this.pictureData =this.pictureData.bind(this);
    }

    componentWillMount(){
        fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=k5NtPxObjn5al0hbRRl2cnx1KVQot2JOJxY0NqJH`)
          .then(data => data.json())
          .then(json => this.setState({api: json.photos}))
          .catch(err => console.log(err))
    }



    save(i){
        debugger;
        // e.preventDefault();
        console.log(`im saved to the database: ${i}`)
        // this is all we want saved into the db:
        // id.img_src
        // id.full_name
        fetch('/user/1', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'image': this.state.api[i].img_src,
                'description': this.state.api[i].camera.full_name
            })
        })
        .then(() => console.log(i));
    }


    render(){

        if(this.state.api) {
            const crop = this.state.api.splice(0,10);
            console.log(crop)
            var item = crop.map((item, i) => {
                return (
                    <div key={i} className='public_api'>
                        <i className="fa fa-globe" aria-hidden="true"></i>
                            <h2>Nasa's API</h2>
                            <h4>leveraging open data</h4>
                        <img src={item.img_src}/>
                        <div onClick={() => this.save(i)}>
                            <i className="fas fa-heart"></i>
                        </div>
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
                        <li><i className="fas fa-user"></i></li>
                    </ul>
                </header>

                <section>
                    {item}
                </section>

            </div>
        )
    }
}
