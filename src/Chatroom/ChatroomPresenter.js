import React from "react";
import styled from "styled-components";

const Container = styled.section`
width: 100vw;
height: 100vh;
display: flex;
justify-content:center;
align-items: center;
flex-direction: column;
`;

const ChatBox = styled.div`
    background-color: rgba(255,255,255,0.9);
    width: 60%;
    height: 80%;
    color: #363883;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
`

const GreetingNotice = styled.p`
    font-weight: 700;
    margin-top: 30px;
    background-color: rgba(0,0,0,0.3);
    color: white;
    padding: 10px 5px;
    border-radius: 5px;
`

const ChatForm = styled.form`
    width: 100%;
    height: 10%;
`;

const ChatText = styled.input`
    width: 100%;
    height: 100%;
`;

const ChatSubmit = styled.input`
position: relative;
left: 75%;
bottom: 80%;
width: 20%;
background-color:#363883;
color: white;
border:none;
outline:none;
padding: 10px;
border-radius: 5px;
`

const ChatroomPresenter = ({greetingNotice}) => 
<Container>
<cite>Chatroom</cite>
<ChatBox>
<GreetingNotice>{greetingNotice}</GreetingNotice>
<ChatForm action={`/chatroom`} method="post">
    <ChatText type="text" name="content" required={true} />
    <ChatSubmit type="submit" value="전송" />  
</ChatForm>
</ChatBox>
</Container>;

export default ChatroomPresenter;