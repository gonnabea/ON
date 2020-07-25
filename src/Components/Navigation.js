import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.section`

`

const Navigation = () => 
<Container>
    <Link to="/chatroom/:id">Chatroom</Link>
    <Link to="/">Home</Link>
</Container>

export default Navigation;