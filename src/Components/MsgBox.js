import React from "react"
import styled from "styled-components"

const Container = styled.section`
  background-color: #548dcb;
  max-width: 200px;
  border-radius: 10px;
  box-shadow: 0 0 10px #548dcb;
`

const Username = styled.span``

const Message = styled.p`
  color: white;
  font-size: 16px;
  margin: 10px;
`

const MsgBox = ({ msg, username, avatar }) => (
  <Container>
    <Username>{username}</Username>
    <Message>{msg}</Message>
  </Container>
)

export default MsgBox
