import React, { Component } from 'react';
import HomePresenter from "./HomePresenter";

class Home extends Component {
  state = {
    username: null,
    loading: true
  }
  
  
  async componentDidMount() {
      setTimeout(
          () => {
              fetch('api')
                   .then(res=>res.json())
                   .then(data=>this.setState({username:data.username, loading:false}));
          },1000
      );
     
                   
     
      
  }

  render() {
    const { username, loading } = this.state;
      return <HomePresenter 
      username={username}
      loading={loading}
    />
  }
}

export default Home;
