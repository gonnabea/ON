import React, { Component } from "react"
import ChatroomPresenter from "./ChatPresenter"
import io from "socket.io-client"

class Chatroom extends Component {
  state = {
    username: null,
    greetingNotice: "",
    msg: [],
    socket: null,
    newMessage: [],
    user: null,
  }

  async componentDidMount() {
    try {
      const socket = io.connect("http://localhost:3001/")
      socket.on("welcome", (msg) => {
        this.setState({ greetingNotice: msg })
      })
      // socket.on("sendMsg", (newMessage) => {
      //   console.log(newMessage)
      //   this.setState({ newMessage })
      // })
      fetch("chat")
        .then((res) => res.json())
        .then((data) =>
          this.setState({
            msg: data.map((model) => model.User.username + model.text),
          })
        )
      fetch("currentUser")
        .then((res) => res.json())
        .then((user) => this.setState({ user }))
      this.setState({ socket })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { greetingNotice, msg, username, socket, newMessage, user } = this.state
    console.log(msg[0])
    return (
      <ChatroomPresenter
        greetingNotice={greetingNotice}
        messages={msg}
        usernames={username}
        socket={socket}
        newMessage={newMessage}
        user={user}
      />
    )
  }
}

export default Chatroom
