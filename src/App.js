import React, { Component } from "react"
import Home from "./Home"
import { Route } from "react-router-dom"
import Chatroom from "./Chatroom"
import GlobalStyles from "./Components/GlobalStyles"
import MessageRoom from "./Screen/Chatroom"

class App extends Component {
  render() {
    return (
      <div className="App">
        <GlobalStyles />

        <Route exact path="/" component={Home} />
        <Route path="/chatroom" component={Chatroom} />
        <Route path="/chatroom/:id" component={MessageRoom} />
      </div>
    )
  }
}

export default App
