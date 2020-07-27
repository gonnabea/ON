import React from "react";
import styled from "styled-components";
import Box from "../Components/3D-Cube";
import Friends from "../Components/Friends";
import MsgBox from "../Components/MsgBox";

const Container = styled.section`
width: 100vw;
height: 100vh;
display: flex;
justify-content:center;
align-items: center;
flex-direction: column;
`;

const FrontContainer = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const ChatBox = styled.div`
    background-color: #F5F9FD;
    width: 60%;
    height: 90%;
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
    background-color: rgba(0,0,0,0.3);
    color: white;
    padding: 10px 5px;
    border-radius: 5px;
`

const ChatForm = styled.form`
    width: 100%;
    height: 10%;
    position: absolute;
    bottom: 0;
`;

const ChatText = styled.input`
    width: 100%;
    height: 100%;
    border-radius: 5px;
    border:none;
    box-shadow: 0 0 20px rgba(0,0,0,0.3);
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

const ChatroomPresenter = ({greetingNotice, messages}) => 
<Container>
    {console.log(messages)}
<Box width={"600px"} frontBg="rgba(84, 141, 203, 0.9)" leftBg="rgba(255,255,255,1)" 
front={
    <FrontContainer>
<ChatBox>
    <GreetingNotice>{greetingNotice}</GreetingNotice>
    <ChatScreen>
    {
        messages.map( message => <MsgBox msg={message} />)
    }
    </ChatScreen>
    <ChatForm action="chat" method="post">
    <ChatText type="text" name="content" required={true} />
    <ChatSubmit type="submit" value="전송" />  
    </ChatForm>
</ChatBox>

    </FrontContainer>

    
}
left={
    <Friends />
}

/>
</Container>;

export default ChatroomPresenter;