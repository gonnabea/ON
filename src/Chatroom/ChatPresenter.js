import React from "react"
import styled from "styled-components"
import Book from "../Components/3DBook"
import Navigation from "../Hooks/useNavigation"
import { Link } from "react-router-dom"

const Container = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
const ChatroomPresenter = ({
  greetingNotice,
  messages,
  newMessage,
  user,
  handleSubmit,
  userList,
  enterRoom,
}) => {
  return (
    <Container>
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
                        {user.username}({user.status === "active" ? "온라인" : "오프라인"})
                      </ChatRoomLink>
                    )
                  })
                : null}
            </UserList>
          </BookFront>
        }
        inside1={
          <Inside>
            <ChatBox></ChatBox>
          </Inside>
        }
      />
    </Container>
  )
}

export default ChatroomPresenter
