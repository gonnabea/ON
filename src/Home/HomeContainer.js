import React, { Component } from "react"
import HomePresenter from "./HomePresenter"

class Home extends Component {
  state = {
    username: null,
    loading: true,
    homeData: null,
    user: null,
  }

  async componentDidMount() {
    setTimeout(() => {
      fetch("currentUser")
        .then((res) => res.json())
        .then((user) => this.setState({ user, username: user.username, loading: false }))
    }, 1000)
  }

  render() {
    const { username, loading } = this.state
    console.log(this.state.homeData)
    return <HomePresenter username={username} loading={loading} />
  }
}

export default Home
