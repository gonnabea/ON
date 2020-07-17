import React, { Component } from 'react';
import HomePresenter from "./HomePresenter";

class Home extends Component {
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
      return <HomePresenter username={username} />
  }
}

export default Home;
