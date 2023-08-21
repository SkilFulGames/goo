import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import PlayerList from "../components/player-list";

import { PageWrapper, opacityAnim } from "../style/generic-styles";
import chevron from "../img/chevronleft.svg";
import gameContext from "../context/game-context";
import timeContext from "../context/time-context";

const Header = styled.div`
  display: flex;
  height: 5%;
  padding: 2%;
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90%;
  align-items: center;
  justify-content: space-around;
`;
const CustomH1 = styled.h1`
  margin: 0;
  padding: 10%;
  font-size: 275%;
  color: #ff9233;
  animation: ${opacityAnim} 0.2s 0s linear;
`;
const CustomBtn = styled.button`
  width: 60%;
  height: 7.5%;
  font-size: 225%;
  background: #ff9233;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${opacityAnim} 0.2s 0s linear;
`;

function Player() {
  const navigate = useNavigate();
  const { game, setGame } = useContext(gameContext);
  const { timer, setTimer } = useContext(timeContext);
  return (
    <PageWrapper>
      <Header>
        <div
          style={{ display: "flex", height: "100%" }}
          onClick={() => navigate("/")}
        >
          <img src={chevron} alt="goback" />
        </div>
      </Header>
      <Body>
        <CustomH1>Who Play ?</CustomH1>
        <PlayerList />
        <CustomBtn
          onClick={() => {
            setGame({ ...game, isRunning: true });
            setTimer({ ...timer, isActive: true, isPaused: false });
            navigate("/game");
          }}
        >
          Start !
        </CustomBtn>
      </Body>
    </PageWrapper>
  );
}

export default Player;
