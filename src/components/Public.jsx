import React, { Component } from 'react';
import './public.css';
import { Link } from 'react-router-dom'

export default class Public extends Component {
    constructor(props){
        super(props)
        this.state={
            isLoading: true
        }
        this.getSpace = this.getSpace.bind(this);
    }

    getSpace() {
        fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=k5NtPxObjn5al0hbRRl2cnx1KVQot2JOJxY0NqJH`)
          .then(data => data.json())
          .then(json => this.setState({api: json.photos}))
          .catch(err => console.log(err))
    }

    // componentWillMount(){
    //     getSpace();
    // }

    componentDidMount() {
        this.getSpace();
        setTimeout(() => this.setState({isLoading: false}), 6000);
    }

    render(){
      const isLoading = this.state.isLoading;
      console.log('isLoading:', isLoading)
        if(this.state.api) {
            const crop = this.state.api.splice(0,10);
            var item = crop.map((item, i) => {
                return (
                    <div key={i} className='public_api'>
                        <i className="fa fa-globe" aria-hidden="true"></i>
                            <h2>Nasa's API</h2>
                            <h4>leveraging open data</h4>
                        <img src={item.img_src}/>
                        <h3><b>{item.camera.name}</b> {item.camera.full_name}</h3>
                    </div>
                )
            })
        }
        if(isLoading) {
            return(
            <div className='body'>

               <header>
                   <ul>
                       <li><i className="fa fa-camera" aria-hidden="true"></i></li>
                       <li className='logo'>Nasagram</li>
                       <li>
                           <Link to="/user/1/api"><i className="fas fa-user"></i></Link>
                           <Link to="/register"><i className="fas fa-edit"></i></Link>
                       </li>
                   </ul>
               </header>

               <section>
                    <h1>Loading...</h1>
               </section>

           </div>
           )
        }
        return(
            <div className='body'>

               <header>
                   <ul>
                       <li><i className="fa fa-camera" aria-hidden="true"></i></li>
                       <li className='logo'>Nasagram</li>
                       <li>
                           <Link to="/user/1/api"><i className="fas fa-user"></i></Link>
                           <Link to="/register"><i className="fas fa-edit"></i></Link>
                       </li>
                   </ul>
               </header>

               <section>
                   {item}
               </section>

           </div>

           );
    }
}
