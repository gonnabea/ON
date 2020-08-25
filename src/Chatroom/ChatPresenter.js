import React from "react"
import styled from "styled-components"
import Box from "../Components/3D-Cube"
import Friends from "../Components/Friends"
import MsgBox from "../Components/MsgBox"
import Book from "../Components/3DBook"
import Navigation from "../Hooks/useNavigation"
import axios from "axios"
import MyMsgBox from "../Components/MyMsgBox"

const Container = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const FrontContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const ChatBox = styled.div`
  background-color: #f5f9fd;
  width: 100%;
  height: 100%;
  color: #363883;
  border-radius: 5px;
  box-shadow: 0 0 10px black;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ChatScreen = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 50px 20px;
  width: 100%;
`

const GreetingNotice = styled.p`
  position: fixed;
  font-weight: 700;
  margin-top: 30px;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  padding: 10px 5px;
  border-radius: 5px;
  z-index: 100;
`

const ChatForm = styled.form`
  width: 100%;
  height: 10%;
  position: absolute;
  bottom: 0;
`

const ChatText = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: none;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
`

const ChatSubmit = styled.input`
  position: relative;
  left: 75%;
  bottom: 80%;
  width: 20%;
  background-color: #363883;
  color: white;
  border: none;
  outline: none;
  padding: 10px;
  border-radius: 5px;
`

const BookFront = styled.div`
  width: 100%;
  height: 100%;
  background-color: #314458;
  box-shadow: 0 0 10px white;
  display: flex;
`

const ChatroomPresenter = ({ greetingNotice, messages, newMessage, user, handleSubmit }) => {
  return (
    <Container>
      {console.log(newMessage)}

      <Book
        width="350px"
        height="500px"
        spineWidth="50px"
        state={true}
        front={
          <BookFront>
            <span>
              <Navigation />
            </span>
          </BookFront>
        }
        inside1={
          <BookFront>
            <ChatBox>
              <GreetingNotice>{greetingNotice}</GreetingNotice>
              <ChatScreen id="chatScreen">
                {messages.map((message, index) =>
                  user && message.username === user.username ? (
                    <MyMsgBox key={index} msg={message.text} username={message.username} />
                  ) : (
                    <MsgBox key={index} msg={message.text} username={message.username} />
                  )
                )}

                {newMessage.map((message, index) =>
                  user && message.username === user.username ? (
                    <MyMsgBox key={index} msg={message.text} username={message.username} />
                  ) : (
                    <MsgBox key={index} msg={message.text} username={message.username} />
                  )
                )}
              </ChatScreen>
              <ChatForm onSubmit={handleSubmit} action="chat" method="post">
                <ChatText id="text" type="text" name="content" required={true} />
                <ChatSubmit type="submit" value="전송" />
              </ChatForm>
            </ChatBox>
          </BookFront>
        }
      />
    </Container>
  )
}

export default ChatroomPresenter
