import React, { useEffect, useState, useRef } from "react"
import styled from "styled-components"
import Navigation from "../Hooks/useNavigation"
import Book from "../Components/3DBook"
import { Link } from "react-router-dom"
import api from "../api"

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
  background-image: url("/cover.jpg");
  background-size: cover;
  box-shadow: 0 0 10px white;
  display: flex;
  flex-direction: column;
`

const Back = styled.section`
  width: 100%;
  height: 100%;
  background-image: url("/backCover.jpg");
  background-size: 100% 100%;
  transform: scaleX(-1);
`

const Spine = styled.section`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #98c0d9;
`

const Chatroom = (props) => {
  const [loggedUser, setLoggedUser] = useState()

  const statusMsg = useRef()

  const setStatusMsg = (e) => {
    e.preventDefault()
    api.setStatusMsg(statusMsg.current.value) // 상태메세지 설정
    statusMsg.current.value = ""
  }

  const getUser = async () => {
    const user = await api.getLoggedUser()
    console.log(user.data)
    return user.data
  }

  useEffect(() => {
    try {
      setLoggedUser(getUser())

      getUser()
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
        width="500px"
        height="650px"
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
