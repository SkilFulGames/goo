import React, { useContext } from "react";
import styled from "styled-components";

import GameContext from "../context/game-context";
import PlayerContext from "../context/player-context";
import check from "../img/check.svg";
import cross from "../img/cross-noir.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ $xl }) => ($xl ? "90%" : "60%")};
  height: ${({ $xl }) => ($xl ? "150px" : "50px")};
  background: #d9d9d9;
  border-radius: 10px;
`;
const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 5%;
`;
const ActionContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const CustomName = styled.p`
  font-weight: bold;
  color: ${({ $highlight }) => ($highlight ? "#ff9233" : "black")};
`;
const TryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  align-items: center;
`;

function PlayerItem({
  idx,
  player,
  currPlayerId,
  action,
  playersToCopy,
  setPlayersToCopy,
}) {
  const { game } = useContext(GameContext);
  const { players, setPlayers } = useContext(PlayerContext);

  const highlight = idx === currPlayerId && action === "define";

  function handleTryDown() {
    if (player.nbOfTry === 1) {
      setPlayers(
        players.map((p, i) => {
          if (p.name === player.name) {
            return {
              ...p,
              letter: p.letter + game.targetWord[p.letter.length],
            };
          }
          return p;
        })
      );
      setPlayersToCopy(playersToCopy.filter((p, i) => p.name !== player.name));
    } else {
      const nextPlayers = playersToCopy.map((p, i) => {
        if (i === idx) {
          return { ...p, nbOfTry: p.nbOfTry - 1 };
        } else {
          return p;
        }
      });
      setPlayersToCopy(nextPlayers);
    }
  }
  function handleTryUp() {
    const nextPlayers = playersToCopy.map((p) => {
      if (p.name === player.name) {
        return { ...p, nbOfTry: p.nbOfTry + 1, redo: false };
      } else {
        return p;
      }
    });
    setPlayersToCopy(nextPlayers);
  }
  function handleTrickDone() {
    setPlayersToCopy(playersToCopy.filter((p, i) => p.name !== player.name));
  }

  return (
    <Container $xl={action === "copy"}>
      <InfoContainer>
        <CustomName $highlight={highlight}>{player.name}</CustomName>
        <p>{player.letter.length ? player.letter : "-"}</p>
      </InfoContainer>
      {action === "copy" && (
        <ActionContainer>
          {player.redo && <button onClick={handleTryUp}>Joker</button>}
          <TryContainer>
            <p>Try : {player.nbOfTry}</p>
            <div onClick={handleTryDown}>
              <img src={cross} alt="cross" style={{ width: "25px" }} />
            </div>
          </TryContainer>
          <div onClick={handleTrickDone}>
            <img src={check} alt="check" style={{ width: "50px" }} />
          </div>
        </ActionContainer>
      )}
    </Container>
  );
}

export default PlayerItem;
