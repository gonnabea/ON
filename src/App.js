import React, { Component } from "react"
import Home from "./Home"
import { Route } from "react-router-dom"
import GlobalStyles from "./Components/GlobalStyles"
import ChatRoom from "./Screen/Chatroom"
import Setting from "./Screen/Setting"

class App extends Component {
  render() {
    return (
      <div className="App">
        <GlobalStyles />
        <Route exact path="/" component={Home} />
        <Route path="/chatroom" component={ChatRoom} />
        <Route path="/setting" component={Setting} />
      </div>
    )
  }
}

export default App
