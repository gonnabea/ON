import React from "react"
import styled from "styled-components"

const Container = styled.section`
  display: ${(props) => props.display};
  position: absolute;
  background-color: white;
  z-index: 999;
`

const Title = styled.h1``

const SearchFriends = styled.input``

const FriendsList = styled.ul``

const Friend = styled.li``

const ProfileImg = styled.img``

const FriendName = styled.cite``

const GroupChatModal = ({ friends, display = "none" }) => (
  <Container display={display}>
    <Title>대화상대 선택</Title>
    <FriendsList>
      {friends
        ? friends.map((friend) => (
            <Friend>
              <ProfileImg>{friend.profileImg}</ProfileImg>
              <FriendName>{friend.name}</FriendName>
            </Friend>
          ))
        : null}
    </FriendsList>
  </Container>
)

export default GroupChatModal
