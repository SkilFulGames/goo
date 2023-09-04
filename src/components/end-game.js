import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import timeContext from "../context/time-context";
import gameContext from "../context/game-context";
import playerContext from "../context/player-context";
import joystick from "../img/joystick.svg";
import house from "../img/house-fill.svg";
import share from "../img/share.svg";
import restart from "../img/restart-fill-orange.svg";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80%;
  align-items: center;
  justify-content: space-around;
`;
const JoystickContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;
const CustomTime = styled.p`
  font-size: 160%;
  font-weight: bold;
  color: #ff9233;
`;
const BtnsContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0 5%;
  justify-content: space-evenly;
`;

function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let extraSeconds = seconds % 60;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;
  return minutes + ":" + extraSeconds;
}

function EndGame() {
  const navigate = useNavigate();

  const { players, setPlayers } = useContext(playerContext);
  const { timer, setTimer } = useContext(timeContext);
  const { game, setGame } = useContext(gameContext);

  return (
    <Root>
      <JoystickContainer>
        <img src={joystick} alt="joystick" style={{ width: "175px" }} />
        <p style={{ color: "#D9D9D9", fontWeight: "bold" }}>
          Share your game results
        </p>
      </JoystickContainer>
      <div>
        <CustomTime>
          {formatTime(timer.timeCounter)} spend in a game of {game.targetWord}
        </CustomTime>
      </div>
      <div>
        <p>Stats ouéé</p>
        <p>Stats ouéé</p>
        <p>Stats ouéé</p>
        <p>Stats ouéé</p>
      </div>
      <BtnsContainer>
        <div onClick={() => navigate("/")}>
          <img src={house} alt="house" style={{ width: "40px" }} />
        </div>
        <div>
          <img src={share} alt="share" style={{ width: "40px" }} />
        </div>
        <div
          onClick={() => {
            setPlayers(players.map((p) => ({ ...p, letter: "" })));
            setTimer({
              isActive: true,
              isPaused: false,
              timeCounter: null,
            });
            setGame({ ...game, isRunning: true });
          }}
        >
          <img src={restart} alt="restart" style={{ width: "40px" }} />
        </div>
      </BtnsContainer>
    </Root>
  );
}

export default EndGame;
