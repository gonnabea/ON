import React, { Component } from "react"
import ChatroomPresenter from "./ChatPresenter"
import io from "socket.io-client"
import axios from "axios"

class Chatroom extends Component {
  state = {
    username: null,
    greetingNotice: "",
    msg: [],
    socket: null,
    newMessage: [],
    user: null,
  }

  sentMessage = []

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target)
    const message = document.getElementById("text")
    console.log(message.value)
    this.state.socket.emit("sendMsg", { username: this.state.user.username, text: message.value })
    axios({
      method: "post",
      url: `chat`,
      data: {
        content: message.value,
      },
    })
    this.sentMessage.push({ username: this.state.user.username, text: message.value })
    this.setState({ newMessage: this.sentMessage })
    message.value = ""
  }

  async componentDidMount() {
    try {
      const socket = io.connect("http://localhost:3001/")
      socket.on("welcome", (msg) => {
        this.setState({ greetingNotice: msg })
      })
      socket.on("sendMsg", (newMessage) => {
        console.log(newMessage)
        this.setState({ newMessage })
      }) // 메세지 받기 , recieving message
      fetch("chat")
        .then((res) => res.json())
        .then((data) =>
          this.setState({
            msg: data.map((model) => {
              return { username: model.User.username, text: model.text, avatar: model.User.avatar }
            }),
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
    console.log(msg)
    return (
      <ChatroomPresenter
        greetingNotice={greetingNotice}
        messages={msg}
        usernames={username}
        socket={socket}
        newMessage={newMessage}
        user={user}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default Chatroom
