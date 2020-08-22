import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"

const GlobalStyles = createGlobalStyle`
 ${reset};
a{
    text-decoration: none;
}
*{
    box-sizing: border-box;
}
body{
background-color: black;
color:white;
font-size: 20px;
}
`

export default GlobalStyles
