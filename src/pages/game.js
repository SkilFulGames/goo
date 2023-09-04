import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Menu from "../components/game-menu";
import DynamicSentence from "../components/dynamic-sentence";
import PlayerItem from "../components/player-item";
import EndGame from "../components/end-game";

import TimerContext from "../context/time-context";
import PlayerContext from "../context/player-context";
import GameContext from "../context/game-context";
import { PageWrapper } from "../style/generic-styles";
import chevron from "../img/chevronleft.svg";
import menuSVG from "../img/list.svg";

const Header = styled.div`
  display: flex;
  width: 95%;
  justify-content: space-between;
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
const BtnContainer = styled.div`
  display: flex;
  width: 100%;
  height: 10%;
  justify-content: space-evenly;
`;
const CustomBtn = styled.button`
  height: 75%;
  width: 25%;
  background: #ff9233;
  font-size: 150%;
  font-weight: bold;
  border: none;
  border-radius: 10px;
`;
const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  height: 60%;
  max-height: 475px;
  align-items: center;
  overflow: auto;
  scroll-behavior: smooth;
  gap: 10px;
`;

function Game() {
  const navigate = useNavigate();

  //Context
  const { timer, setTimer } = useContext(TimerContext);
  const { players, setPlayers } = useContext(PlayerContext);
  const { game, setGame } = useContext(GameContext);

  //States
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState("define");
  const [currPlayerId, setCurrPlayerId] = useState(0);
  const [playersToCopy, setPlayersToCopy] = useState([]);
  const [eliminatedPlayers, setEliminatedPlayers] = useState([]);

  //GameLogic
  function handleNo() {
    setCurrPlayerId((currPlayerId + 1) % players.length);
  }
  function handleYes() {
    handleNo();
    setAction("copy");
    setPlayersToCopy(players.filter((p, index) => index !== currPlayerId));
    // let nextPlayers = incrementStat(
    //   nextPlayers,
    //   players[currPlayerId].name,
    //   "nbDef"
    // );
    // setPlayers(nextPlayers);
  }

  //Effects
  useEffect(() => {
    let interval = null;

    if (timer.isActive && !timer.isPaused && game.isRunning) {
      interval = setInterval(() => {
        setTimer({ ...timer, timeCounter: timer.timeCounter + 1 });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timer.isActive, timer.isPaused, timer.timeCounter]);

  useEffect(() => {
    if (action === "copy" && playersToCopy.length === 0) {
      setAction("define");
    }
  }, [action, playersToCopy]);

  useEffect(() => {
    for (const player of players) {
      if (player.letter === game.targetWord) {
        const eliminated = [...eliminatedPlayers, player];
        const nextPlayers = players.filter((p) => p.name !== player.name);
        if (nextPlayers.length === 1) {
          setPlayers([...players, ...eliminatedPlayers]);
          setTimer({ ...timer, isPaused: true, isActive: false });
          setGame({ ...game, isRunning: false });
        } else {
          setEliminatedPlayers(eliminated);
          setPlayers(nextPlayers);
        }
      }
    }
  }, [JSON.stringify(players), eliminatedPlayers]);

  //Render
  if (!game.isRunning) {
    return (
      <PageWrapper>
        <Header>
          <div
            style={{ display: "flex", height: "100%" }}
            onClick={() => navigate("/player")}
          >
            <img src={chevron} alt="goback" />
          </div>
        </Header>
        <EndGame />
      </PageWrapper>
    );
  }
  return (
    <PageWrapper>
      <Menu setIsOpen={setIsOpen} isOpen={isOpen} />
      <Header>
        <div
          style={{ display: "flex", height: "100%" }}
          onClick={() => navigate("/player")}
        >
          <img src={chevron} alt="goback" />
        </div>
        <div
          style={{ display: "flex", height: "105%" }}
          onClick={() => setIsOpen(true)}
        >
          <img src={menuSVG} alt="goback" />
        </div>
      </Header>
      <Body>
        <DynamicSentence name={players[currPlayerId].name} action={action} />
        {action === "define" && (
          <BtnContainer>
            <CustomBtn onClick={handleNo}>No</CustomBtn>
            <CustomBtn onClick={handleYes}>Yes</CustomBtn>
          </BtnContainer>
        )}
        <PlayerContainer>
          {action === "define" ? (
            <>
              {players.map((p, i) => (
                <PlayerItem
                  key={i}
                  idx={i}
                  player={p}
                  currPlayerId={currPlayerId}
                  action={action}
                />
              ))}
            </>
          ) : (
            <>
              {playersToCopy.map((p, i) => (
                <PlayerItem
                  key={i}
                  idx={i}
                  player={p}
                  currPlayerId={currPlayerId}
                  action={action}
                  playersToCopy={playersToCopy}
                  setPlayersToCopy={setPlayersToCopy}
                />
              ))}
            </>
          )}
        </PlayerContainer>
      </Body>
    </PageWrapper>
  );
}

export default Game;
