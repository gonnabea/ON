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
  const [messages, setMessages] = useState([])
  const [loggedUser, setLoggedUser] = useState()
  const [userList, setUserList] = useState()
  const targetUser = useRef()
  const [submit, setSubmit] = useState(0)
  const screenRef = useRef()
  const [flash, setFlash] = useState()
  const [socket, setSocket] = useState(io.connect("http://localhost:3001/"))
  
  const newMsgs = useRef([])
  const enterRoom = async (user) => {
    newMsgs.current = []; // 방을 이동할 시 주고받았던 메세지 초기화
    targetUser.current = user
    await axios({
      method: "post",

      url: "chatroom",
      data: {
        UserId: user.id,
        
      },
    })

    socket.emit("welcome", `${loggedUser ? loggedUser.username : "새로운 유저"} 접속`) // 서버에 접속 메세지 보내기
    socket.on("welcome", (msg) => {
      console.log("본인빼고 적용되어야 함" + msg)
      setFlash(msg)
    }) // 타 클라이언트 접속 메세지 리스닝

    socket.off("sendMsg").on("sendMsg", (msg) => {
      console.log(msg)
      addNewMsg(msg)
      // getOriginMsg(targetUser.current)
    }) // 타 클라이언트에게 메세지 받기 , recieving message

    getOriginMsg(user)
  } // 유저가 특정 채팅방에 들어왔을 때

  const getOriginMsg = async (user) => {
    const originMessage = await axios({
      method: "post",
      url: "find-chat",
      data: {
        targetUser: user,
      },
    }) // 백엔드로 타겟 유저와의 채팅기록을 요청

    setMessages(
      originMessage.data.map((msg) => {
        return { text: msg.text, username: msg.User.username }
      })
    ) // 메세지들을 업데이트함
    screenRef.current &&
      screenRef.current.scrollTo({
        top: screenRef.current.scrollHeight + 100,
        behavior: "smooth",
      }) // 메세지를 받았을 때 자동 스크롤 내리기
  }

  const addNewMsg = (msg) => {
    newMsgs.current.push(msg)
    console.log(newMsgs.current)
    setSubmit(submit => submit+1)
  } // 실시간으로 주고 받은 메세지 추가 함수

  const handleSubmit = async (e) => {
    e.preventDefault()
    const message = document.getElementById("text")
    const { username } = loggedUser
    const newMessage = {username, text: message.value}

    axios({
      method: "post",
      url: `chat`,
      data: {
        content: message.value,
        targetID: targetUser.current.id,
      },
    }) // 메세지를 백엔드 DB에 저장 요청

    socket.emit("sendMsg", newMessage) // 채팅메세지 전송 소켓
    addNewMsg(newMessage)
    message.value = ""
    // setTimeout(() => getOriginMsg(targetUser.current), 0) // 콜스택에 담아두어 axios 처리 후 데이터를 불러오기 위함
  } // 메세지 보냈을 때 처리

  useEffect(() => {
    console.log(props)
    try {
      fetch("currentUser")
        .then((res) => res.json())
        .then((user) => setLoggedUser(user))

      fetch("chat")
        .then((res) => res.json())
        .then((data) => {
          setUserList(data.allUser)
        })
    } catch (err) {
      console.log(err)
    }
    return () => {
      console.log("cleaned up")
      console.log(socket)
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
              <GreetingNotice>{flash}</GreetingNotice> {/* 새로운 유저가 접속했을 때 */}
              <ChatScreen id="chatScreen" ref={screenRef}>
                {messages
                  ? messages.map((message, index) =>
                      loggedUser && message.username === loggedUser.username ? (
                        <MyMsgBox key={index} msg={message.text} username={message.username} /> // 내가 보낸 메세지
                      ) : (
                        <MsgBox key={index} msg={message.text} username={message.username} /> // 받은 메세지
                      )
                    )
                  : null}
                {newMsgs.current ? 
              newMsgs.current.map((message, index) =>
              loggedUser && message.username === loggedUser.username ? (
                <MyMsgBox key={index} msg={message.text} username={message.username} /> // 내가 보낸 메세지
              ) : (
                <MsgBox key={index} msg={message.text} username={message.username} /> // 받은 메세지
              )): null}
                
               
              
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
