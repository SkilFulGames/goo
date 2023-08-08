import React, { useContext, useRef } from "react";
import styled, { keyframes } from "styled-components";

import playerContext from "../context/player-context";
import { opacityAnim } from "../style/generic-styles";
import xCircle from "../img/x-circle.svg";

const slideFromLeft = keyframes`
  0% {
    transform: translateX(-1000px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  } 
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  height: 80%;
  gap: 20px;
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80%;
  max-height: 340px;
  align-items: center;
  overflow: auto;
  scroll-behavior: smooth;
  gap: 10px;
`;
const AddBtn = styled.button`
  margin: 5%;
  width: 40%;
  height: 7.5%;
  font-size: 160%;
  background: #ff9233;
  border: none;
  border-radius: 5px;
  animation: ${opacityAnim} 0.2s 0s linear;
`;
const Item = styled.div`
  display: flex;
  width: 75%;
  min-height: 70px;
  background: #f5f5f5;
  border-radius: 20px;
  animation: ${slideFromLeft} 0.1s;
`;
const Name = styled.input`
  padding: 0 0 0 2%;
  width: 80%;
  font-size: 130%;
  border: none;
  border-radius: 20px;
  background: #f5f5f5;

  &:focus {
    outline: none;
  }
`;
const Remove = styled.button`
  padding: 0 2% 0 0;
  width: 20%;
  border: none;
  border-radius: 20px;
  background: #f5f5f5;
  animation: ${slideFromLeft} 0.1s 0s backwards;

  img {
    width: 75%;
  }
`;

function PlayerList() {
  const positionRef = useRef(null);
  const { players, setPlayers } = useContext(playerContext);

  function addPlayer() {
    const nextPlayer = {
      name: `Player ${players.length + 1}`,
      letter: "",
      position: players.length,
      redo: false,
      hasDefined: false,
      stats: {
        nbDef: 0,
        nbFailedDef: 0,
        nbCopied: 0,
        nbFailedTry: 0,
        nbLetterGiven: 0,
      },
    };
    setPlayers([...players, nextPlayer]);
  }

  function setPlayerName(e, i) {
    setPlayers(
      players.map((player, idx) => {
        if (idx === i) {
          return { ...player, name: e.target.value };
        } else {
          return player;
        }
      })
    );
  }

  function resetPlayerName(i) {
    setPlayers(
      players.map((player, idx) => {
        if (idx === i) {
          return { ...player, name: "" };
        } else {
          return player;
        }
      })
    );
  }

  function removePlayer(i) {
    const nextPlayers = players
      .filter((p, id) => i !== id)
      .map((p, id) => ({
        ...p,
        position: id,
        name: p.name.startsWith("Player") ? `Player ${id + 1}` : p.name,
      }));
    setPlayers(nextPlayers);
  }

  return (
    <Container>
      <AddBtn
        onClick={() => {
          addPlayer();
          positionRef?.current?.scrollIntoView();
        }}
      >
        Add Player
      </AddBtn>
      <List>
        {players.map((p, i) => (
          <Item key={i} ref={positionRef}>
            <Name
              type="text"
              value={p.name}
              onChange={(e) => setPlayerName(e, i)}
              onFocus={() => resetPlayerName(i)}
            />
            {players.length > 2 && (
              <Remove onClick={() => removePlayer(i)}>
                <img src={xCircle} alt="remove" />
              </Remove>
            )}
          </Item>
        ))}
      </List>
    </Container>
  );
}

export default PlayerList;
