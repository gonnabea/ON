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

const Back = styled.section`
  width: 100%;
  height: 100%;
  background-color: pink;
  transform: scaleX(-1);
`

const Chatroom = (props) => {
  console.log(props)

  const [loggedUser, setLoggedUser] = useState()

  const statusMsg = useRef()

  const setStatusMsg = (e) => {
    e.preventDefault()
    axios({
      method: "post",
      url: "setStatusMsg",
      data: {
        text: statusMsg.current.value,
      },
    })
    statusMsg.current.value = ""
  }

  useEffect(() => {
    try {
      fetch("currentUser")
        .then((res) => res.json())
        .then((user) => setLoggedUser(user))
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
        backState={true}
        front={
          <BookFront>
            {/* <Head>
                <Navigation />
                {loading === true ? "Now Loading..." : `Welcome ${user ? user.username : ""}!`}
              </Head>
              <Intro>연결책</Intro> */}
          </BookFront>
        }
        back={
          <Back>
            <Navigation />
            <cite>⚙ 설정</cite>
            <form action="setStatusMsg" method="post" onSubmit={(e) => setStatusMsg(e)}>
              <input ref={statusMsg} type="text" placeholder="상태메세지" name="text" />
              <input type="submit" value="적용" />
            </form>
          </Back>
        }
      />
    </Container>
  )
}

export default Chatroom
