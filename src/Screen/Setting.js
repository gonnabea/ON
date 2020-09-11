import React, { useEffect, useState, useRef } from "react"
import styled from "styled-components"
import Navigation from "../Hooks/useNavigation"
import Book from "../Components/3DBook"
import { Link } from "react-router-dom"
import axios from "axios"

const Container = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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

const Back = styled.section`
  width: 100%;
  height: 100%;
  background-color: pink;
  transform: scaleX(-1);
`

const Spine = styled.section`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
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
        spine={
          <Spine>
            <h1>ON</h1>
          </Spine>
        }
      />
    </Container>
  )
}

export default Chatroom
