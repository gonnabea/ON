import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Navigation from "../Hooks/useNavigation"
import Book from "../Components/3DBook"
import { Link } from "react-router-dom"
import axios from "axios"
import io from "socket.io-client"
import MsgBox from "../Components/MsgBox"
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
  flex-direction: column;
  transform: scaleX(-1);
`

const Inside = styled.div`
  width: 100%;
  height: 100%;
  background-color: #314458;
  box-shadow: 0 0 10px white;
  display: flex;
`

const UserList = styled.ul`
  display: flex;
  flex-direction: column;
`

const ChatRoomLink = styled(Link)`
  color: white;
  background-color: grey;
`

const Chatroom = (props) => {
  console.log(props)
  const [username, setUsername] = useState()
  const [flash, setFlash] = useState()
  const [message, setMessage] = useState([])
  const [socket, setSocket] = useState()
  const [newMessage, setNewMessage] = useState([])
  const [loggedUser, setLoggedUser] = useState()
  const [userList, setUserList] = useState()
  const [targetUser, setTargetUser] = useState()
  let sentMessage = newMessage
  const enterRoom = (userID) => {
    setTargetUser(userID)
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    const message = document.getElementById("text")

    const { username } = loggedUser
    socket.emit("sendMsg", { username, text: message.value })
    axios({
      method: "post",
      url: `chat`,
      data: {
        content: message.value,
        targetUser,
      },
    })
    sentMessage.push({ username, text: message.value })

    setNewMessage(sentMessage)
    message.value = ""
  }
  useEffect(() => {
    axios({
      method: "post",
      url: "chatroom",
      data: {
        UserId: props.match.params.id,
      },
    })
    try {
      const socket = io.connect("http://localhost:3001/")
      socket.on("welcome", (msg) => {
        setFlash(msg)
      })
      socket.on("sendMsg", (newMessage) => {
        console.log(newMessage)

        sentMessage.push(newMessage[newMessage.length - 1])

        setNewMessage(sentMessage)
      }) // 메세지 받기 , recieving message
      fetch("chat")
        .then((res) => res.json())
        .then((data) => {
          console.log(data)

          setMessage(
            data.allChat.map((model) => {
              const { username, avatar } = model.User
              return { username, text: model.text, avatar }
            })
          )
          setUserList(data.allUser)
        })
      fetch("currentUser")
        .then((res) => res.json())
        .then((user) => setLoggedUser({ user }))

      setSocket(socket)
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <Container>
      <Book
        width="350px"
        height="500px"
        spineWidth="50px"
        state={true}
        initState={"open"}
        front={
          <BookFront>
            <span>
              <Navigation />

              <UserList>
                {userList
                  ? userList.map((user, index) => {
                      return (
                        <ChatRoomLink
                          key={index}
                          onClick={() => enterRoom(user.userID)}
                          to={`/chatroom/${user.id}`}
                          params={{ userId: user.id }}
                        >
                          {user.username}({user.status === "active" ? "온라인" : "오프라인"})
                        </ChatRoomLink>
                      )
                    })
                  : null}
              </UserList>
            </span>
            <UserList></UserList>
          </BookFront>
        }
        inside1={
          <Inside>
            <ChatBox>
              <GreetingNotice>{flash}</GreetingNotice>
              <ChatScreen id="chatScreen">
                {console.log(message)}
                {message.map((message, index) =>
                  loggedUser && message.username === loggedUser.username ? (
                    <MyMsgBox key={index} msg={message.text} username={message.username} />
                  ) : (
                    <MsgBox key={index} msg={message.text} username={message.username} />
                  )
                )}

                {newMessage.map((message, index) =>
                  loggedUser && message.username === loggedUser.username ? (
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
          </Inside>
        }
      />
    </Container>
  )
}

export default Chatroom
