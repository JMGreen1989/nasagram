import React, { Component } from 'react';
import './UserAPI.css';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { Section, Title, Article, Prop, list } from "./Loader";


export default class UserAPI extends Component {
    constructor(props){
        super(props)
        this.state={
            api: null,
            active: false,
            isLoading: true
        }

        this.save = this.save.bind(this);
        this.getSpace = this.getSpace.bind(this);
    }

    getSpace() {
        fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=k5NtPxObjn5al0hbRRl2cnx1KVQot2JOJxY0NqJH`)
          .then(data => data.json())
          .then(json => this.setState({api: json.photos}))
          .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getSpace();
        setTimeout(() => this.setState({isLoading: false}), 60000);
    }

    save(i){
        var links = document.querySelectorAll('.fa-heart')
        console.log('im the link', links)
        links.forEach((element) => {
            element.addEventListener('click', () => {
                element.style.color = 'red';
            })
        })

        console.log(`im saved to the database: ${i}`)
        fetch('/api/faves', {
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
                    <div key={i} className='api'>
                        <i className="fa fa-globe" aria-hidden="true"></i>
                            <h2>Nasa's API</h2>
                            <h4>leveraging open data</h4>
                        <img src={item.img_src}/>
                        <div
                        onClick={() => this.save(i)}>
                            <i className="fas fa-heart"></i>
                        </div>
                        <h3><b>{item.camera.name}</b> {item.camera.full_name}</h3>
                    </div>
                )
            })
       }
       if (isLoading) {
        return (
            <div className='body user'>

                <header>
                    <ul>
                        <li><i className="fa fa-camera" aria-hidden="true"></i></li>
                        <li className='logo'>Nasagram</li>
                        <li className="heart">
                            <Link to={`/myFaves`}><i className="fas fa-user"></i>Profile</Link>
                        </li>
                    </ul>
                </header>

                <section style={{display: 'flex', justifyContent: 'center'}}>
               <Section>
                    <Title>Loading...</Title>
                    <Article>
                    <ReactLoading type={list[6].prop} />
                     </Article>
                    </Section>

               </section>

            </div>
            )
       }
        return (

             <div className='body user'>

                <header>
                    <ul>
                        <li><i className="fa fa-camera" aria-hidden="true"></i></li>
                        <li className='logo'>Nasagram</li>
                        <li className="heart">
                            <Link to={`/myFaves`}><i className="fas fa-user"></i>Profile</Link>
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
