import React, { Component } from 'react';
import './userAPI.css';
import { Link } from 'react-router-dom'

export default class UserAPI extends Component {
    constructor(props){
        super(props)
        this.state={
            api: null,
            active: false,
            isLoading: true
        }

        this.save = this.save.bind(this);
        // this.pictureData =this.pictureData.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.getSpace = this.getSpace.bind(this);
    }

    getSpace() {
        fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=k5NtPxObjn5al0hbRRl2cnx1KVQot2JOJxY0NqJH`)
          .then(data => data.json())
          .then(json => this.setState({api: json.photos}))
          .catch(err => console.log(err))
    }

    // componentWillMount(){
    //     this.getSpace();
    // }

    componentDidMount() {
        this.getSpace();
        setTimeout(() => this.setState({isLoading: false}), 15000);
    }

    changeColor(i) {
        // debugger;
        this.setState((prevState, props) => {
            return {active: !prevState.active}
        })

        console.log('active:', this.state.active, i);
        // this.getSpace();
    }

    save(i){
        debugger;
        // e.preventDefault();
        this.changeColor(i);
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
        .then(() => console.log(this.state.api[i]))
    }

    render(){
        const isLoading = this.state.isLoading;
        const active = this.state.active;
        console.log('isLoading:', isLoading)

        if(this.state.api) {
            const crop = this.state.api.slice();
            console.log(crop)
            var item = crop.map((item, i) => {
                return (
                    <div key={i} className='public_api'>
                        <i className="fa fa-globe" aria-hidden="true"></i>
                            <h2>Nasa's API</h2>
                            <h4>leveraging open data</h4>
                        <img src={item.img_src}/>
                        <div
                        onClick={() => this.save(i)}>
                            <i style={active ? {color: 'red'} : {color: 'green'}} className="fas fa-heart"></i>
                        </div>
                        <h3><b>{item.camera.name}</b> {item.camera.full_name}</h3>
                    </div>
                )
            })
       }
       if (isLoading) {
        return (
            <div className='body'>

                <header>
                    <ul>
                        <li><i className="fa fa-camera" aria-hidden="true"></i></li>
                        <li className='logo'>Nasagram</li>
                        <li className="heart">
                            <Link to={`/user/1`}><i className="fas fa-heart"></i></Link>
                        </li>
                    </ul>
                </header>

                <section>
                    <h1>Loading...</h1>
                </section>

            </div>
            )
       }
        return (

             <div className='body'>

                <header>
                    <ul>
                        <li><i className="fa fa-camera" aria-hidden="true"></i></li>
                        <li className='logo'>Nasagram</li>
                        <li className="heart">
                            <Link to={`/user/1`}><i className="fas fa-heart"></i></Link>
                        </li>
                    </ul>
                </header>

                <section>
                    {item}
                </section>

            </div>

        )
    }
}
