import React from "react";
import styled from "styled-components";
import Cube from "../Components/3D-Cube";

const Container = styled.section`
width: 100vw;
height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

export default (props) => 
<Container>
    {console.log(props)}
    <span>
        {props.loading===true ? "Now Loading..." : ""}
    </span>
    {props.username ? `Hello ${props.username} from Home!!` : ""}
    <Cube width={100} />
    <Cube width={100} />
</Container>