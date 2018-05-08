import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        files: []
    }

  }

  componentWillMount(){
      fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=k5NtPxObjn5al0hbRRl2cnx1KVQot2JOJxY0NqJH`)
        .then(data => data.json())
        .then(json => this.setState({api: json.photos}))
        .catch(err => console.log(err))
  }

  onDrop(files) {
          const formatedFiles = []
          files.forEach(file => formatedFiles.push(URL.createObjectURL(file)))
          this.setState({
            files: formatedFiles
          });


  }

  render() {
      let images = this.state.files.map((photo, i) => (
          <img key={i} src={photo}/>
      ))

      if(this.state.api){

          const crop = this.state.api.splice(0,10);
          var item = crop.map((item, i) => {
              return (
                  <li key={i}>
                    <img src={item.img_src}/>
                    <i className="fas fa-thumbs-up"></i>
                  </li>
              )
          })
    }

    return (
        <div className='body'>
        <header>
            <ul>
                <li>Sign-out</li>
                <li>
                <Dropzone onDrop={this.onDrop.bind(this)}>
                    <p>Drag and drop your images here</p>
                </Dropzone>
                </li>
            </ul>
        </header>

        <h1>Nasagram</h1>

            <div className='api_feed'>
                <ul>
                    {item}
                </ul>
            </div>



            <footer>
                <h3>thank you for visiting nasagram</h3>
            </footer>

        </div>
    )
  }
}

export default App

//
// <div className='user_feed'>
//     <ul>
//         <li><img src='https://images.unsplash.com/photo-1446776858070-70c3d5ed6758?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9b43c5c75516f6ad53f828bd14cbd354&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb'/></li>
//         <li><img src='https://images.unsplash.com/photo-1446776858070-70c3d5ed6758?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9b43c5c75516f6ad53f828bd14cbd354&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb'/></li>
//         <li><img src='https://images.unsplash.com/photo-1446776858070-70c3d5ed6758?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9b43c5c75516f6ad53f828bd14cbd354&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb'/></li>
//         <li><img src='https://images.unsplash.com/photo-1446776858070-70c3d5ed6758?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9b43c5c75516f6ad53f828bd14cbd354&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb'/></li>
//         <li><img src='https://images.unsplash.com/photo-1446776858070-70c3d5ed6758?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9b43c5c75516f6ad53f828bd14cbd354&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb'/></li>
//         <li><img src='https://images.unsplash.com/photo-1446776858070-70c3d5ed6758?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9b43c5c75516f6ad53f828bd14cbd354&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb'/></li>
//         <li><img src='https://images.unsplash.com/photo-1446776858070-70c3d5ed6758?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9b43c5c75516f6ad53f828bd14cbd354&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb'/></li>
//         <li><img src='https://images.unsplash.com/photo-1446776858070-70c3d5ed6758?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9b43c5c75516f6ad53f828bd14cbd354&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb'/></li>
//         <li><img src='https://images.unsplash.com/photo-1446776858070-70c3d5ed6758?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9b43c5c75516f6ad53f828bd14cbd354&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb'/></li>
//     </ul>
// </div>
