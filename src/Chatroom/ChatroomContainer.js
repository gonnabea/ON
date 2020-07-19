import React, { Component } from 'react';
import ChatroomPresenter from "./ChatroomPresenter";
import io from "socket.io-client"

class Chatroom extends Component {
  state = {
    username: null
  }

  componentDidMount() {
       const socket = io.connect("http://localhost:3001/");
           socket.emit("init", { name: "Jiwon"});

           socket.on("welcome", msg => {
               console.log(msg);
           })
       
  }

  render() {
   
      return <ChatroomPresenter  />
  }
}

export default Chatroom;
