import React, { Component } from 'react'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }

  }

  componentWillMount(){
      // fetch(`https://api.nasa.gov/EPIC/api/natural/images?api_key=${process.env.local.API_KEY}`)
      //   .then(data => data.json())
      //   .then(json => console.log(json))
      //   .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        hello
      </div>
    )
  }
}

export default App
