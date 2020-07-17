import React, { Component } from 'react';
import Home from './Home';
import { Route } from "react-router-dom";
import Chatroom from './Chatroom';

class App extends Component {
 

  render() {
      return <div className="App">
        <Route exact path="/" component={Home} />
        <Route path="/chatroom" component={Chatroom} />
      </div>
  }
}

export default App;
