import React, { Component } from 'react';
import HomePresenter from "./HomePresenter";

class Home extends Component {
  state = {
    username: null,
    loading: true,
    homeData: null
  }
  
  
  async componentDidMount() {
      setTimeout(
          () => {
              fetch('api')
                   .then(res=>res.json())
                   .then(data=>this.setState({username:data.username, loading:false}));
          },1000
      );
      fetch("home")
      .then(res=>res.json())
      .then(data=>this.setState({homeData:data}));
  }

  render() {
    const { username, loading } = this.state;
    console.log(this.state.homeData)
      return <HomePresenter 
      username={username}
      loading={loading}
    />
  }
}

export default Home;
