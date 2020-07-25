import { createGlobalStyle } from "styled-components";
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
background: rgb(131,58,180);
background: linear-gradient(
90deg, 
rgba(131,58,180,1) 0%, 
rgba(253,29,29,1) 50%, 
rgba(252,176,69,1) 100%);
color:white;
font-size: 20px;
}
`

export default GlobalStyles;