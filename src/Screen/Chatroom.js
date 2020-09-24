import React, { useEffect, useState, useRef } from "react"
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
  padding-right: 30%;
`

const ChatSubmit = styled.input`
  position: relative;
  left: 75%;
  bottom: 80%;
  width: 20%;
  background-color: #f23f79;
  color: white;
  border: none;
  outline: none;
  padding: 10px;
  border-radius: 5px;
`

const BookFront = styled.div`
  width: 100%;
  height: 100%;
  background-color: #8a81fd;
  box-shadow: 0 0 10px white;
  display: flex;
  flex-direction: column;
  transform: scaleX(-1);
`

const Inside = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  box-shadow: 0 0 10px white;
  display: flex;
`

const UserList = styled.ul`
  display: flex;
  flex-direction: column;
`

const ChatRoomLink = styled(Link)`
  color: white;
  background-color: #f23f79;
  height: 70px;
  display: flex;
  align-items: center;
  border: solid 2px black;
`

const UserInfo = styled.span`
  display: flex;
  flex-direction: column;
`

const Username = styled.span`
  margin-bottom: 20px;
  font-size: 20px;
`

const StatusMsg = styled.span`
  font-size: 15px;
  opacity: 0.8;
`

const Chatroom = (props) => {
  console.log(props)
  const [flash, setFlash] = useState()
  const [message, setMessage] = useState([])
  const [loggedUser, setLoggedUser] = useState()
  const [userList, setUserList] = useState()
  const targetUser = useRef()
  const [submit, setSubmit] = useState(0)
  const screenRef = useRef()

  const socket = io.connect("http://localhost:3001/")

  const enterRoom = async (user) => {
    console.log(user)
    console.log(targetUser)
    targetUser.current = user
    const { data: chatroom } = await axios({
      method: "post",

      url: "chatroom",
      data: {
        UserId: user.id,
      },
    })

    getOriginMsg(user)
  }

  const getOriginMsg = async (user) => {
    const originMessage = await axios({
      method: "post",
      url: "find-chat",
      data: {
        targetUser: user,
      },
    }) // 백엔드로 타겟 유저와의 채팅을 요청

    setMessage(
      originMessage.data.map((msg) => {
        return { text: msg.text, username: msg.User.username }
      })
    ) // 메세지들을 업데이트함
    screenRef.current &&
      screenRef.current.scrollTo({
        top: screenRef.current.scrollHeight + 100,
        behavior: "smooth",
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const message = document.getElementById("text")

    const { username } = loggedUser

    axios({
      method: "post",
      url: `chat`,

      data: {
        content: message.value,
        targetID: targetUser.current.id,
      },
    })
    socket.emit("sendMsg", { username, text: message.value })
    // newMessage.current.push({ username, text: message.value })

    message.value = ""
  }

  useEffect(() => {
    try {
      socket.on("welcome", (msg) => {
        setFlash(msg)
      })

      fetch("chat")
        .then((res) => res.json())
        .then((data) => {
          setUserList(data.allUser)
        })

      fetch("currentUser")
        .then((res) => res.json())
        .then((user) => setLoggedUser(user))

      socket.on("sendMsg", (msg) => {
        // 메세지를 받았을 때
        console.log(msg)
        getOriginMsg(targetUser.current)

        console.log("sendMsg socket is activated!!")
      }) // 메세지 받기 , recieving message
    } catch (err) {
      console.log(err)
    }
    return () => {
      console.log("cleaned up")
    }
  }, [])

  return (
    <Container>
      <Book
        width="350px"
        height="500px"
        spineWidth="50px"
        state={true}
        front={
          <BookFront>
            <Navigation />

            <UserList>
              {userList
                ? userList.map((user, index) => {
                    console.log(user, loggedUser)

                    return (
                      <ChatRoomLink
                        key={index}
                        onClick={() => enterRoom(user)}
                        to={{
                          pathname: `/chatroom/${user.id}`,
                          targetUser: user,
                        }}
                      >
                        <UserInfo>
                          <Username>
                            {user.username}({user.status === "active" ? "온라인" : "오프라인"}){" "}
                          </Username>
                          <StatusMsg>{user.statusMsg}</StatusMsg>
                        </UserInfo>
                      </ChatRoomLink>
                    )
                  })
                : null}
            </UserList>
          </BookFront>
        }
        inside1={
          <Inside>
            <ChatBox>
              <GreetingNotice>{flash}</GreetingNotice>
              <ChatScreen id="chatScreen" ref={screenRef}>
                {message
                  ? message.map((message, index) =>
                      loggedUser && message.username === loggedUser.username ? (
                        <MyMsgBox key={index} msg={message.text} username={message.username} /> // 내가 보낸 메세지
                      ) : (
                        <MsgBox key={index} msg={message.text} username={message.username} /> // 받은 메세지
                      )
                    )
                  : null}
                {/* 메세지를 받을 때마다 모든 메세지를 다시 로드하는 비효율적인 구조. */}
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
