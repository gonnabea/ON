import React, { Component } from 'react';
import ChatroomPresenter from "./ChatPresenter";
import io from "socket.io-client"

class Chatroom extends Component {
  state = {
    username: null,
    greetingNotice: "",
    msg: []
  }

  async componentDidMount() {
       const socket = io.connect("http://localhost:3001/");
           socket.on("welcome", msg => {
               this.setState({greetingNotice: msg})
           })
           fetch("chat").then(res => res.json()).then(
             data => this.setState({msg: data.map( model => model.text )})
           )
           
  }

  render() {
    const { greetingNotice, msg } = this.state
    console.log(msg[0])
      return <ChatroomPresenter 
      greetingNotice = {greetingNotice}
      messages = {msg}
      />
  }
}

export default Chatroom;
