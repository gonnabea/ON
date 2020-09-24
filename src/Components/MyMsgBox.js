import React from "react"
import styled from "styled-components"

const Container = styled.section`
  background-color: #8a81fd;
  max-width: 200px;

  box-shadow: 0 0 10px #548dcb;
  align-self: flex-end;
  position: relative;
  right: 0;
  margin-bottom: 5px;
`

const Username = styled.span``

const Message = styled.p`
  color: white;
  font-size: 16px;
  margin: 10px;
  position: relative;
  right: 0;
`

const MyMsgBox = ({ msg, username, avatar }) => (
  <Container>
    <Message>{msg}</Message>
  </Container>
)

export default MyMsgBox
