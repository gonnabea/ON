import React, { Component } from "react"
import Home from "./Home"
import { Route } from "react-router-dom"
import Chatroom from "./Chatroom"
import GlobalStyles from "./Components/GlobalStyles"
import Navigation from "./Hooks/useNavigation"

class App extends Component {
  render() {
    return (
      <div className="App">
        <GlobalStyles />
        <Navigation />
        <Route exact path="/" component={Home} />
        <Route path="/chatroom/:id" component={Chatroom} />
      </div>
    )
  }
}

export default App
