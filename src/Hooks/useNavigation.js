import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const Container = styled.section`
  width: 100%;
`

const Form = styled.form``

const Input = styled.input``

const Submit = styled.input``

const Header = styled.div`
  width: 100%;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.5);
`

const SLink = styled(Link)`
  color: white;
  margin-right: 10px;
`

const Navigation = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("currentUser")
      .then((res) => res.json())
      .then((user) => {
        setUser(user)
      })
  }, [])

  return user ? (
    <Container>
      <Header>
        <SLink to="/">홈으로</SLink>
        <SLink to="/chatroom">채팅</SLink>
        <a href="http://localhost:3001/logout" style={{ color: "white" }}>
          Logout
        </a>
      </Header>
    </Container>
  ) : (
    <Container>
      <Header>
        <SLink to="/">홈으로</SLink>
        <SLink to="/chatroom">채팅</SLink>
      </Header>
      <Form action="http://localhost:3001/login" method="post">
        <Input type="text" name="username" placeholder="username" required={true} />
        <Input type="password" name="password" placeholder="password" required={true} />
        <Submit type="submit" value="Login!" />
      </Form>
      <Form action="http://localhost:3001/join" method="post">
        <Input type="email" name="email" placeholder="E-mail" required={true} />
        <Input type="text" name="username" placeholder="Username" required={true} />
        <Input type="password" name="password" placeholder="Password" required={true} />
        <Input type="password" name="password2" placeholder="Verify Password" required={true} />
        <Submit type="submit" value="Join!" />
      </Form>
    </Container>
  )
}

export default Navigation
