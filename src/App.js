import React, { Component } from "react"
import Home from "./Home"
import { Route } from "react-router-dom"
import Chatroom from "./Chatroom"
import GlobalStyles from "./Components/GlobalStyles"
import MessageRoom from "./Screen/Chatroom"
import Setting from "./Screen/Setting"

class App extends Component {
  render() {
    return (
      <div className="App">
        <GlobalStyles />

        <Route exact path="/" component={Home} />
        <Route exact path="/chatroom" component={Chatroom} />
        <Route path="/chatroom/:id" component={MessageRoom} />
        <Route path="/setting" component={Setting} />
      </div>
    )
  }
}

export default App
