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

const SubmitForm = styled.form``

const Checkbox = styled.input``

const SubmitBtn = styled.input``

const GroupChatModal = ({ friends, display = "none", loggedUser }) => (
  <Container display={display}>
    <Title>대화상대 선택</Title>
    <SubmitForm action="create-groupchat" method="post">
      <FriendsList>
        {friends && loggedUser
          ? friends.map((friend) =>
              loggedUser.username !== friend.username ? ( // 본인은 목록에서 제거
                <Friend>
                  <ProfileImg>{friend.profileImg ? friend.profileImg : null}</ProfileImg>
                  <Checkbox
                    type="checkbox"
                    name={"targetUsers"}
                    value={`${friend.id}/${friend.username}`}
                  />
                  <FriendName>{friend.username}</FriendName>
                </Friend>
              ) : null
            )
          : null}
      </FriendsList>
      <SubmitBtn type="submit" value="드루와!" />
    </SubmitForm>
  </Container>
)

export default GroupChatModal
