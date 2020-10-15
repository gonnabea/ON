import React from "react"
import styled, { keyframes } from "styled-components"
import PropTypes from "prop-types"

const openCover = () => keyframes`
from {
      transform: rotateY(0deg);
    }
    to {
      transform: rotateY(-150deg) ;
    }
`

const openBook = () => keyframes`
from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100px);
    }
`

const Container = styled.section`
  transform-style: preserve-3d;
  transform-origin: center;
  position: relative;
  color: white;
  perspective: 5000px; // 5000px 만큼 멀리서 보기 : 더 사실적인 시점 구현
  /* animation: rotate 3s forwards; */
  width: ${(props) => (props.width ? props.width : "!00px")};
  height: ${(props) => (props.height ? props.height : "150px")};
  animation: ${(props) => (props.backState ? "rotate" : null)} 0.7s forwards linear;
  box-shadow: 20px 20px 30px black;
  @keyframes rotate {
    to {
      transform: rotateY(180deg);
    }
  }
`

const Front = styled.div`
  position: absolute;
  width: ${(props) => (props.width ? props.width : "100px")};
  height: ${(props) => (props.height ? props.height : "150px")};
  background-color: black;
  color: white;
  animation: ${(props) => (props.state && props.initState !== "open" ? openCover : null)} 0.5s
    forwards linear;
  transform-origin: top left;
  transform: ${(props) => (props.initState === "open" ? "rotateY(-180deg)" : null)};
`

const Back = styled.div`
  position: absolute;
  width: ${(props) => (props.width ? props.width : "100px")};
  height: ${(props) => (props.height ? props.height : "150px")};
  background-color: black;

  transform: translateZ(
    ${(props) => (props.spineWidth ? `calc(${props.spineWidth}*-1)` : "-30px")}
  );
`

const Left = styled.div`
  position: absolute;
  width: calc(${(props) => (props.spineWidth ? props.spineWidth : "30px")});
  height: ${(props) => (props.height ? props.height : "150px")};
  background-color: grey;

  transform: rotateY(90deg)
    translateX(${(props) => (props.spineWidth ? `calc(${props.spineWidth} /2)` : "15px")})
    translateZ(${(props) => (props.spineWidth ? `calc(${props.spineWidth} /-2)` : "15px")});
`

const Inside1 = styled.div`
  position: absolute;
  top: 7px;
  width: calc(${(props) => (props.width ? props.width : "100px")} + (-10px));
  height: calc(${(props) => (props.height ? props.height : "150px")} + (-10px));
  transform: translateX(4px)
    translateZ(${(props) => (props.width ? `calc(${props.width} / -20)` : "-5px")});
  background-color: white;
  border-radius: 0 3px 3px 0;
  color: black;
`

const Inside2 = styled.div`
  position: absolute;
  top: 7px;
  width: calc(${(props) => (props.width ? props.width : "100px")} + (-10px));
  height: calc(${(props) => (props.height ? props.height : "150px")} + (-10px));
  transform: translateX(4px)
    translateZ(${(props) => (props.width ? `calc(${props.width} / -18)` : "-5px")});
  background-color: red;
  border-radius: 0 3px 3px 0;
`

const Inside3 = styled.div`
  position: absolute;
  top: 7px;
  width: calc(${(props) => (props.width ? props.width : "100px")} + (-10px));
  height: calc(${(props) => (props.height ? props.height : "150px")} + (-10px));
  transform: translateX(4px)
    translateZ(${(props) => (props.width ? `calc(${props.width} / -16)` : "-5px")});
  background-color: white;
  border-radius: 0 3px 3px 0;
`

const Inside4 = styled.div`
  position: absolute;
  top: 7px;
  width: calc(${(props) => (props.width ? props.width : "100px")} + (-10px));
  height: calc(${(props) => (props.height ? props.height : "150px")} + (-10px));
  transform: translateX(4px)
    translateZ(${(props) => (props.width ? `calc(${props.width} / -14)` : "-5px")});
  background-color: white;
  border-radius: 0 3px 3px 0;
`

const Inside5 = styled.div`
  position: absolute;
  top: 7px;
  width: calc(${(props) => (props.width ? props.width : "100px")} + (-10px));
  height: calc(${(props) => (props.height ? props.height : "150px")} + (-10px));
  transform: translateX(4px)
    translateZ(${(props) => (props.width ? `calc(${props.width} / -12)` : "-5px")});
  background-color: white;
  border-radius: 0 3px 3px 0;
`

const Inside6 = styled.div`
  position: absolute;
  top: 7px;
  width: calc(${(props) => (props.width ? props.width : "100px")} + (-10px));
  height: calc(${(props) => (props.height ? props.height : "150px")} + (-10px));
  transform: translateX(4px)
    translateZ(${(props) => (props.width ? `calc(${props.width} / -10)` : "-5px")});
  background-color: white;
  border-radius: 0 3px 3px 0;
`

const Book = ({
  width = "100px",
  height = "150px",
  spineWidth = "50px",
  front,
  inside1,
  back,
  spine,
  state,
  initState,
  backState,
}) => {
  return (
    <Container
      width={width}
      height={height}
      state={state}
      initState={initState}
      backState={backState}
    >
      <Front
        width={width}
        height={height}
        spineWidth={spineWidth}
        state={state}
        initState={initState}
      >
        {front}
      </Front>
      <Inside1 width={width} height={height} spineWidth={spineWidth}>
        {inside1}
      </Inside1>
      <Inside2 width={width} height={height} spineWidth={spineWidth}></Inside2>
      <Inside3 width={width} height={height} spineWidth={spineWidth}></Inside3>
      <Inside4 width={width} height={height} spineWidth={spineWidth}></Inside4>
      <Inside5 width={width} height={height} spineWidth={spineWidth}></Inside5>

      <Back width={width} height={height} spineWidth={spineWidth}>
        {back}
      </Back>
      <Left width={width} height={height} spineWidth={spineWidth}>
        {spine}
      </Left>
    </Container>
  )
}

Book.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  spineWidth: PropTypes.string,
  front: PropTypes.element,
  inside: PropTypes.element,
  back: PropTypes.element,
  spine: PropTypes.element,
}

export default Book
