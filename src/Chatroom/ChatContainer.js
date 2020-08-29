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
    userList: null,
    targetUser: null,
  }

  // enterRoom = (user) => {
  //   this.setState({ targetUser: user })
  //   axios({
  //     method: "post",
  //     url: "chatroom",
  //     data: {
  //       UserId: user.id,
  //     },
  //   })
  // }

  async componentDidMount() {
    try {
      const socket = io.connect("http://localhost:3001/")
      socket.on("welcome", (msg) => {
        this.setState({ greetingNotice: msg })
      })

      fetch("chat")
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          this.setState({
            msg: data.allChat.map((model) => {
              const { username, avatar } = model.User
              return { username, text: model.text, avatar }
            }),
            userList: data.allUser,
          })
        })
      fetch("currentUser")
        .then((res) => res.json())
        .then((user) => this.setState({ user }))

      this.setState({ socket })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { greetingNotice, msg, username, socket, newMessage, user, userList } = this.state
    console.log(userList)

    return (
      <ChatroomPresenter
        greetingNotice={greetingNotice}
        messages={msg}
        usernames={username}
        socket={socket}
        newMessage={newMessage}
        user={user}
        userList={userList}
        handleSubmit={this.handleSubmit}
        enterRoom={this.enterRoom}
      />
    )
  }
}

export default Chatroom
