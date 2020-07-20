import React from "react";
import styled from "styled-components";

const Container = styled.section`

`;

export default (props) => 
<Container>
<cite>Chatroom</cite>
<p>{props.greetingNotice}</p>
</Container>;