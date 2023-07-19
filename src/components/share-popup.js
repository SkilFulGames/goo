import React from "react";
import styled from "styled-components";

import crossOrange from "../img/cross-orange.svg";
import insta from "../img/insta.svg";
import mail from "../img/envelope.svg";
import github from "../img/github.svg";
import sharesheet from "../img/share.svg";
import joystick from "../img/joystick.svg";

const Background = styled.div`
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;
const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 75%;
  background: #071f36;
  border: 3px solid #ff9233;
  border-radius: 10px;
`;
const Header = styled.div`
  height: 8%;
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
const CustomH1 = styled.h1`
  margin: 0;
  color: #ff9233;
`;
const CustomH3 = styled.h3`
  color: white;
  padding: 0 10%;
  text-align: center;
`;
const Row = styled.div`
  display: flex;
  width: 100%;
  height: 20%;
  justify-content: space-evenly;
  align-items: center;
`;
const CustomSVG = styled.img`
  width: 60px;
`;

function SharePopup({ setIsOpen }) {
  return (
    <Background onClick={() => setIsOpen(false)}>
      <Root onClick={(e) => e.stopPropagation()}>
        <Header>
          <CloseBtn onClick={() => setIsOpen(false)}>
            <img
              src={crossOrange}
              alt="cross-orange"
              style={{ width: "30px" }}
            />
          </CloseBtn>
        </Header>
        <PopupBody>
          <CustomH1>{"<3!"}</CustomH1>
          <CustomH3>Want to send a message ?</CustomH3>
          <Row>
            <a href="https://www.instagram.com/skilfulgvm3s/" target="blank">
              <CustomSVG src={insta} alt="insta" />
            </a>
            <a href="mailto:skilfulgvmes@hotmail.com">
              <CustomSVG src={mail} alt="mail" />
            </a>
          </Row>
          <CustomH3>or wanna see the source code ?</CustomH3>
          <Row>
            <a target="blank" href="https://github.com/SkilFulGames/goo">
              <CustomSVG src={github} alt="github" />
            </a>
          </Row>
        </PopupBody>
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "2px" }}
        >
          <p>Made by</p>
          <img
            src={joystick}
            alt="skilful-logo"
            style={{
              width: "24px",
              opacity: "90%",
              margin: "1%",
            }}
          />
          <p>with love</p>
        </div>
      </Root>
    </Background>
  );
}

export default SharePopup;
