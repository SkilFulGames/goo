import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import TimerContext from "../context/time-context";
import PlayerContext from "../context/player-context";
import GameContext from "../context/game-context";
import Menu from "../components/game-menu";
import DynamicSentence from "../components/dynamic-sentence";
import { PageWrapper, opacityAnim } from "../style/generic-styles";
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
  height: 100%;
  width: 25%;
  background: #ff9233;
  border: none;
  border-radius: 10px;
`;
const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 60%;
  justify-content: space-around;
`;

function Game() {
  const navigate = useNavigate();
  const { timer, setTimer } = useContext(TimerContext);
  const { players, setPlayers } = useContext(PlayerContext);
  const { game, setGame } = useContext(GameContext);

  //States
  const [isOpen, setIsOpen] = useState(false);
  const [currPlayerId, setCurrPlayerId] = useState(0);
  const [action, setAction] = useState("define");
  const [playersToCopy, setPlayersToCopy] = useState([]);
  const [definerName, setDefinerName] = useState("");
  const [eliminatedPlayers, setEliminatedPlayers] = useState([]);

  //GameLogic
  function handleNo() {
    if (action === "define") {
      handleDefine();
    } else {
      const stillHaveTry = playersToCopy[currPlayerId].try !== 1;
      if (stillHaveTry) {
        handleTryUpdatedPlayers();
      } else {
        handleNoMoreTry();
      }
    }
  }

  function handleDefine() {
    if (lastToDefine()) {
      let resetedPlayers = players.map((element) => {
        if (element.name === players[currPlayerId].name) {
          return {
            ...element,
            hasDefined: false,
          };
        } else {
          return {
            ...element,
            hasDefined: false,
          };
        }
      });
      // resetedPlayers = incrementStat(
      //   resetedPlayers,
      //   players[currPlayerId].name,
      //   "nbFailedDef"
      // );
      setPlayers(resetedPlayers);
      setCurrPlayerId(0);
    } else {
      let nextPlayers = players.map((element) => {
        if (element.name === players[currPlayerId].name) {
          return {
            ...element,
            hasDefined: true,
          };
        } else {
          return element;
        }
      });
      // nextPlayers = incrementStat(
      //   nextPlayers,
      //   players[currPlayerId].name,
      //   "nbFailedDef"
      // );
      let nextDefiner = null;
      nextPlayers.some((el, id) => {
        nextDefiner = id;
        return !el.hasDefined;
      });
      setPlayers(nextPlayers);
      setCurrPlayerId(nextDefiner ?? 0);
    }
  }

  function lastToDefine() {
    const playersWithoutCurr = players.filter(
      (el) => el.name !== players[currPlayerId].name
    );
    let stillActive = 0;
    for (const player of playersWithoutCurr) {
      if (!player.hasDefined) {
        stillActive++;
      }
    }
    return stillActive === 0 ? true : false;
  }

  function handleYes() {
    if (action === "define") {
      setActionToCopy();
    } else {
      setPlayersAndUpdateCurrId();
    }
  }

  function setActionToCopy() {
    setAction("copy");
    setCurrPlayerId(0);
    setDefinerName(players[currPlayerId].name);
    let nextPlayers = players.map((element) => {
      if (element.name === players[currPlayerId].name) {
        return {
          ...element,
          hasDefined: true,
        };
      } else {
        return element;
      }
    });
    // nextPlayers = incrementStat(
    //   nextPlayers,
    //   players[currPlayerId].name,
    //   "nbDef"
    // );
    setPlayers(nextPlayers);
  }

  //Effects
  useEffect(() => {
    let interval = null;

    if (timer.isActive && !timer.isPaused) {
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

  //Render
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
        <DynamicSentence
          name={action === "define" ? players[currPlayerId].name : definerName}
          action={action}
        />
        {action === "define" && (
          <BtnContainer>
            <CustomBtn onClick={handleNo}>No</CustomBtn>
            <CustomBtn onClick={handleYes}>Yes</CustomBtn>
          </BtnContainer>
        )}
        <PlayerContainer>
          {players.map((p, i) => (
            <div key={i}>
              <p style={{ color: "#D9D9D9" }}>{p.name}</p>
            </div>
          ))}
        </PlayerContainer>
      </Body>
    </PageWrapper>
  );
}

export default Game;
