import React, { Component } from "react"
import HomePresenter from "./HomePresenter"

class Home extends Component {
  state = {
    loading: true,
    homeData: null,
    user: null,
  }

  async componentDidMount() {
    try {
      fetch("currentUser")
        .then((res) => res.json())
        .then((user) => this.setState({ user }))
    } catch (error) {
      console.log(error)
    } finally {
      this.setState({ loading: false })
    }
  }

  render() {
    const { user, loading } = this.state
    console.log(this)
    return <HomePresenter user={user} loading={loading} />
  }
}

export default Home
