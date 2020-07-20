import React, { Component } from 'react';
import ChatroomPresenter from "./ChatroomPresenter";
import io from "socket.io-client"

class Chatroom extends Component {
  state = {
    username: null,
    greetingNotice: ""
  }

  componentDidMount() {
       const socket = io.connect("http://localhost:3001/");
           socket.on("welcome", msg => {
               this.setState({greetingNotice: msg})
           })
       
  }

  render() {
    const { greetingNotice } = this.state
      return <ChatroomPresenter 
      greetingNotice = {greetingNotice}
      />
  }
}

export default Chatroom;
