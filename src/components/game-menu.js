import React, { useContext } from "react";
import styled from "styled-components";

import timeContext from "../context/time-context";
import cross from "../img/cross-bleu.svg";
import play from "../img/play-fill.svg";
import pause from "../img/pause-fill.svg";
import restart from "../img/restart-fill.svg";

const Background = styled.div`
  position: absolute;
  display: flex;
  z-index: ${(props) => (props.$animation ? "2" : "-1")};
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  background: rgb(0, 0, 0, 0.9);
  opacity: ${(props) => (props.$animation ? "1" : "0")};
  transition: opacity ease 0.5s;
`;
const Root = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  right: ${(props) => (props.$animation ? "0" : "-300px")};
  width: 90%;
  height: 100%;
  background: #ff9233;
  transition: right ease 0.5s;
`;
const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;
const BoldText = styled.p`
  font-size: 150%;
  font-weight: bold;
`;
const Chrono = styled(BoldText)`
  font-size: 170%;
  margin: 2%;
`;
const BtnBackground = styled.div`
  display: flex;
  justify-content: center;
  background: #071f36;
  padding: 1%;
  margin: 1%;
  width: 100px;
  height: 40px;
  border-radius: 5px;
`;
const DynamicSentence = styled.div`
  margin-top: 20%;
  font-size: 150%;
  padding: 2%;
  font-weight: bold;
`;
const StatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 30%;
`;

function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let extraSeconds = seconds % 60;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;
  return minutes + ":" + extraSeconds;
}

function Menu({ setIsOpen, isOpen }) {
  const { timer, setTimer } = useContext(timeContext);
  const src = timer.isPaused ? play : pause;
  return (
    <Background $animation={isOpen}>
      <Root $animation={isOpen}>
        <Header>
          <div onClick={() => setIsOpen(false)} style={{ padding: "3%" }}>
            <img src={cross} alt="cross-orange" style={{ width: "40px" }} />
          </div>
        </Header>
        <BoldText>Game started since :</BoldText>
        <Chrono>{formatTime(timer.timeCounter)}</Chrono>
        <BtnBackground
          onClick={() => setTimer({ ...timer, isPaused: !timer.isPaused })}
        >
          <img src={src} alt="play" style={{ width: "40px" }} />
        </BtnBackground>
        <DynamicSentence>Player 1 is dominating</DynamicSentence>
        <StatContainer>
          <p>Tricks Defined</p>
          <p>Tricks Copied</p>
          <p>Letters Gifts</p>
          <p>Dead Player</p>
        </StatContainer>
        <BtnBackground onClick={() => setTimer({ ...timer, timeCounter: 0 })}>
          <img src={restart} alt="restart" style={{ width: "35px" }} />
        </BtnBackground>
      </Root>
    </Background>
  );
}

export default Menu;
