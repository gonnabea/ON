import React from "react";
import styled from "styled-components";

const Container = styled.div`
    width: ${props => props.width *2}px; /*도형 전개도를 생각해보면,*/
    height: ${props => props.width *2}px; /*펼칠 공간을 만들기 위해서 단면의 너비의 2배로 설정해 주어야 한다. */
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    transform-style: preserve-3d; /* 이것을 설정해 주어야 rotate를 했을 때 3d의 형태로 보인다. */
    animation: rotateBox 3s infinite linear;
    @keyframes rotateBox{
        from{
            transform:  rotateX(0);
        }
        to{
            transform:  rotateY(360deg);
        }
    }
`;

const Front = styled.div`
    background-color:black;
    width: ${props => props.width}px;
    height: ${props => props.width}px;
    position: absolute;
    transform: translateZ(${props => props.width/2}px); /* 앞쪽으로 당김  */
`;

const Back = styled.div`
    background-color: purple;
    width: ${props => props.width}px;
    height: ${props => props.width}px;
    position: absolute;
    transform: translateZ(-${props => props.width/2}px) scaleX(-1); /* scaleY: 글자 상하 반전 */
`;

const Bottom = styled.div`
    background-color:orange;
    width: ${props => props.width}px;
    height: ${props => props.width}px;
    position:absolute;
    transform: rotateX(90deg) scaleY(-1); /* scaleY: 글자 상하 반전 */
    bottom: 0;
`;

const Top = styled.div`
    background-color:blue;
    width: ${props => props.width}px;
    height: ${props => props.width}px;
    position:absolute;
    transform: rotateX(90deg);
    top:0;
`;  

const Left = styled.div`
    background-color:pink;
    width: ${props => props.width}px;
    height: ${props => props.width}px;
    position:absolute;
    transform: rotateY(90deg) translateZ(-${props => props.width/2}px) scaleX(-1); /* scaleY: 글자 상하 반전 */
`;

const Right = styled.div`
    background-color:green;
    background-color:pink;
    width: ${props => props.width}px;
    height: ${props => props.width}px;
    position:absolute;
    transform: rotateY(-90deg) translateZ(-${props => props.width/2}px) scaleX(-1);
`;

const Box = ({width}) => {

    console.log(width);

    return(
    <Container width={width}>
        <Front width={width}>앞면</Front>
        <Back width={width}>뒷면</Back>
        <Bottom width={width}>아랫면</Bottom>
        <Top width={width}>윗면</Top>
        <Left width={width}>왼쪽면</Left>
        <Right width={width}>오른쪽면</Right>
    </Container>
    )

}


export default Box;