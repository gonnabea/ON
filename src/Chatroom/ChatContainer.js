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

  sentMessage = this.state.newMessage

  handleSubmit = (e) => {
    e.preventDefault()
    const message = document.getElementById("text")

    const { socket } = this.state
    const { username } = this.state.user
    socket.emit("sendMsg", { username, text: message.value })
    axios({
      method: "post",
      url: `chat`,
      data: {
        content: message.value,
      },
    })

    this.sentMessage.push({ username, text: message.value })
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

        this.sentMessage.push(newMessage[newMessage.length - 1])
        this.setState({ newMessage: this.sentMessage })
      }) // 메세지 받기 , recieving message
      fetch("chat")
        .then((res) => res.json())
        .then((data) =>
          this.setState({
            msg: data.map((model) => {
              const { username, avatar } = model.User
              return { username, text: model.text, avatar }
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
