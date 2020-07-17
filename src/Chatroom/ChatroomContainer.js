import React, { Component } from 'react';
import ChatroomPresenter from "./ChatroomPresenter";

class Chatroom extends Component {
  state = {
    username: null
  }

  componentDidMount() {
       
  }

  render() {
   
      return <ChatroomPresenter  />
  }
}

export default Chatroom;
