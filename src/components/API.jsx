import React, { Component } from 'react'

class API extends Component {
  constructor(props) {
    super(props)
    this.state = {}

  }


  componentWillMount(){
      fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=k5NtPxObjn5al0hbRRl2cnx1KVQot2JOJxY0NqJH`)
        .then(data => data.json())
        .then(json => this.setState({api: json.photos}))
        .catch(err => console.log(err))
  }


  render(){

      console.log(this.state.api)

      if(this.state.api){
          var item = this.state.api.map((item, i) => {
              return (
                  <div>
                  <img src={item.img_src}/>
                  </div>
              )
          })
    }

      return (
          <div >
            {item}
          </div>
      )

  }
}

export default API
