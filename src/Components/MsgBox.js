import React from "react";
import styled from "styled-components";

const Container = styled.section`
    background-color: yellow;
    width: 100px;
    height: 50px;
`;

const Message = styled.p`
color: black;
font-size: 16px;
`

const MsgBox = ({msg}) => 
    <Container>
    <Message>{msg}</Message>  
    </Container>


export default MsgBox;