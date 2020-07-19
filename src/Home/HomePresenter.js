import React from "react";

export default (props) => 
<div>
    {console.log(props)}
    <span>
        {props.loading===true ? "Now Loading..." : ""}
    </span>
    {props.username ? `Hello ${props.username} from Home!!` : ""}
    </div>