import React from "react";
import styled from "styled-components";

const Container = styled.section`
    color: black;
`;

const Header = styled.header`
    display: flex;
    flex-direction: column;
    width: 80%;
`;

const Search = styled.input`
    background-color: #EEEEEE;
`;

const MainArea = styled.section`

`;

const MyProfile = styled.div`

`;

const FriendsList = styled.ul`

`;

const Friend = styled.li`

`;

const Divider = styled.div`
background-color: grey;
width: 100%;
height: 20px;
font-size: 13px;
`

const Friends = () => {

    return(
    <Container>
        <Header>
            <cite>친구</cite>
        <Search type="text" placeholder="이름 검색"></Search>
        </Header>
        <MainArea>
            <MyProfile>sadasdd</MyProfile>
            <Divider>친구 0</Divider>
            <FriendsList>
                <Friend>asdds</Friend>
            </FriendsList>
        </MainArea>

    </Container>
    )

}


export default Friends;