import React, { Component } from 'react';

class App extends Component {
  state = {
    username: null
  }

  componentDidMount() {
       fetch('api')
            .then(res=>res.json())
            .then(data=>this.setState({username:data.username}));
  }

  render() {
    const { username } = this.state
      return <div className="App">
        {username ? `Hello ${username}` : "User Not Found."}
      </div>
  }
}

export default App;
