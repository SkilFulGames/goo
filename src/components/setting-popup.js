import React, { useEffect, useState, useContext } from "react";
import styled, { keyframes } from "styled-components";

import gameContext from "../context/game-context";

import { Background } from "../style/generic-styles";
import infoFill from "../img/info-fill.svg";
import crossOrange from "../img/cross-orange.svg";

const placeholders = [
  "KENDAMA 🌲",
  "SLACK 🧗",
  "SNOW 🏂",
  "SCOOT 🛴",
  "OUT 🕹️",
  "SKATE 🛹",
  "DIVE 🌊",
  "BIKE 🚲",
  "PEN ✍️",
];

const Root = styled.div`
  display: flex;
  width: 80%;
  height: 70%;
  background: #071f36;
  border: 3px solid #ff9233;
  border-radius: 10px;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;
const Row = styled.div`
  display: flex;
  width: 100%;
  height: 15%;
  justify-content: space-evenly;
  align-items: center;
`;
const SVGInfoContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const CustomLabel = styled.label`
  color: #f5f5f5;
  font-size: 120%;
  user-select: none;
`;
const CustomCheckbox = styled.input`
  width: 20%;
  height: 30%;
`;
const flip = keyframes`
  0% {
    transform: rotateX(0);
  }
  100% {
    transform: rotateX(-360deg);
  }
`;
const CustomPlaceholder = styled.p`
  position: absolute;
  left: 50%;
  animation: ${flip} 1s 0.7s infinite;
  user-select: none;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  user-select: none;
`;
const Header = styled.div`
  height: 10%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
const CloseBtn = styled.div`
  padding: 3%;
`;
const PopupBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 85%;
  justify-content: space-evenly;
  align-items: center;
`;
const CustomH3 = styled.h3`
  font-size: 150%;
  color: #ff9233;
  user-select: none;
`;
const CustomP = styled.p`
  padding: 10% 5%;
  font-size: 120%;
  color: #f5f5f5;
  user-select: none;
`;
const DoneButton = styled.button`
  font-size: 175%;
  background: #ff9233;
  border-radius: 10px;
  border: none;
  padding: 1% 15%;
`;

function SettingPopUp({ setIsOpen }) {
  const { game, setGame } = useContext(gameContext);

  const [isInfo, setIsInfo] = useState(false);
  const [placeholder, setPlaceholder] = useState(0);
  const [displayPlaceholder, setDisplayPlaceholder] = useState(
    game.targetWord.length ? false : true
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholder((placeholder + 1) % placeholders.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [placeholder]);

  return (
    <Background onClick={() => setIsOpen(false)}>
      <Root onClick={(e) => e.stopPropagation()}>
        {isInfo ? (
          <InfoContainer>
            <Header>
              <CloseBtn onClick={() => setIsInfo(false)}>
                <img
                  src={crossOrange}
                  alt="cross-orange"
                  style={{ width: "30px" }}
                />
              </CloseBtn>
            </Header>
            <PopupBody>
              <CustomH3>Hard Mode</CustomH3>
              <CustomP>
                In the hard mode there is only one try. if you fail you take a
                letter, even if you fail to define !
              </CustomP>
              <CustomH3>Joker</CustomH3>
              <CustomP>
                Activate this option for a unique bonus try to use when you have
                to copy a trick
              </CustomP>
            </PopupBody>
          </InfoContainer>
        ) : (
          <InputContainer>
            <Row>
              <div style={{ width: "40%" }}>
                <SVGInfoContainer onClick={() => setIsInfo(true)}>
                  <img src={infoFill} alt="info-fill" />
                </SVGInfoContainer>
                <CustomLabel htmlFor="hardmode">Hard Mode</CustomLabel>
              </div>
              <CustomCheckbox
                {...(game.isHard ? { checked: "checked" } : "")}
                id="hardmode"
                type="checkbox"
                value={game.isHard}
                onChange={() => {
                  if (!game.isHard) {
                    setGame({ ...game, isHard: !game.isHard, nbOfTry: 1 });
                  } else {
                    setGame({ ...game, isHard: !game.isHard });
                  }
                }}
              />
            </Row>
            <Row>
              <div style={{ width: "25%" }}>
                <SVGInfoContainer onClick={() => setIsInfo(true)}>
                  <img src={infoFill} alt="info-fill" />
                </SVGInfoContainer>
                <CustomLabel htmlFor="joker">Joker</CustomLabel>
              </div>
              <CustomCheckbox
                {...(game.allowRedo ? { checked: "checked" } : "")}
                id="joker"
                type="checkbox"
                value={game.allowRedo}
                onChange={() =>
                  setGame({ ...game, allowRedo: !game.allowRedo })
                }
              />
            </Row>
            <Row>
              <p
                style={{
                  color: "#F5F5F5",
                  fontSize: "120%",
                  userSelect: "none",
                }}
              >
                Game Of
              </p>
              {displayPlaceholder && (
                <CustomPlaceholder>{`${placeholders[placeholder]}`}</CustomPlaceholder>
              )}
              <input
                id="targetword"
                type="text"
                value={game.targetWord}
                style={{ width: "40%" }}
                onChange={(e) =>
                  setGame({ ...game, targetWord: e.target.value })
                }
                onFocus={() => setDisplayPlaceholder(false)}
                onBlur={() => {
                  if (game.targetWord.length === 0) {
                    setDisplayPlaceholder(true);
                  }
                }}
              />
            </Row>
            {!game.isHard && (
              <Row>
                <CustomLabel htmlFor="nbtry">Nb of try</CustomLabel>
                <input
                  id="nbtry"
                  type="number"
                  min={1}
                  value={game.nbOfTry}
                  style={{ width: "20%" }}
                  onChange={(e) =>
                    setGame({ ...game, nbOfTry: e.target.value })
                  }
                />
              </Row>
            )}
            <Row>
              <DoneButton
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Done !
              </DoneButton>
            </Row>
          </InputContainer>
        )}
      </Root>
    </Background>
  );
}

export default SettingPopUp;
