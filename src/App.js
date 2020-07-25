import React, { Component } from 'react';
import Home from './Home';
import { Route } from "react-router-dom";
import Chatroom from './Chatroom';
import GlobalStyles from "./Components/GlobalStyles";

class App extends Component {
 

  render() {
      return <div className="App">
        <GlobalStyles />
        <Route exact path="/" component={Home} />
        <Route path="/chatroom" component={Chatroom} />
      </div>
  }
}

export default App;
