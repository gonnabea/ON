import React from "react";
import styled from "styled-components";

const Container = styled.section`
`

export default (props) => 
<Container>
    {console.log(props)}
    <span>
        {props.loading===true ? "Now Loading..." : ""}
    </span>
    {props.username ? `Hello ${props.username} from Home!!` : ""}
</Container>