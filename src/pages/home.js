import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";

import SettingPopup from "../components/setting-popup";
import SharePopup from "../components/share-popup";

import { PageWrapper } from "../style/generic-styles";
import gearFill from "../img/gear-fill.svg";
import playCircle from "../img/play-circle.svg";
import heartFill from "../img/heart.svg";

const ButtonsContainer = styled.div`
  position: absolute;
  z-index: 2;
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
  justify-content: space-around;
`;
const SVGSettingContainer = styled.div`
  height: 30%;
`;
const SVGSetting = styled.img`
  width: 36px;
  margin-left: 3%;
  padding: 2%;
  border: 2px solid #ff9233;
  border-radius: 5px;
`;
const SVGPlayContainer = styled.div`
  display: flex;
  width: 100%;
  height: 30%;
  align-items: center;
  justify-content: center;
`;
const SVGPlay = styled.img`
  padding: 1.5%;
  width: 36px;
  height: 36px;
  border: 1.5px solid #ff9233;
  border-radius: 50%;
`;
const SVGShareContainer = styled.div`
  display: flex;
  width: 100%;
  height: 30%;
  align-items: flex-end;
  justify-content: flex-end;
`;
const SVGShare = styled.img`
  width: 36px;
  padding: 2%;
  margin-right: 3%;
  border: 2px solid #ff9233;
  border-radius: 5px;
`;
const DynamicTitleContainer = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const zoom = keyframes`
  0% {
    transform: scale(1) rotateZ(0);
  }
  100% {
    transform: scale(2.7) rotateZ(285deg); 
  }
`;
const DynamicTitle = styled.p`
  ${(props) =>
    props.$animation
      ? css`
          animation: ${zoomOut} 0.75s 0s forwards;
        `
      : css`
          animation: ${zoom} 3s 0.2s forwards;
        `};
  margin: 0;
  font-size: 1000%;
  color: #ff9233;

  user-select: none;
  overflow: hidden;
`;
const zoomOut = keyframes`
  0% {
    transform: scale(2.7) rotateZ(285deg)
  }
  100% {
    transform: scale(10) rotate(360deg)
  }
`;

function Home() {
  const title = "goo";

  const navigate = useNavigate();

  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <PageWrapper>
      {isSettingOpen && <SettingPopup setIsOpen={setIsSettingOpen} />}
      {isShareOpen && <SharePopup setIsOpen={setIsShareOpen} />}
      {!isAnimating && (
        <ButtonsContainer>
          <SVGSettingContainer onClick={() => setIsSettingOpen(true)}>
            <SVGSetting src={gearFill} alt="gear-fill" />
          </SVGSettingContainer>
          <SVGPlayContainer
            onClick={() => {
              setTimeout(() => navigate("/player"), 500);
              setIsAnimating(true);
            }}
          >
            <SVGPlay src={playCircle} alt="play-circle" />
          </SVGPlayContainer>
          <SVGShareContainer onClick={() => setIsShareOpen(true)}>
            <SVGShare src={heartFill} alt="heart-fill" />
          </SVGShareContainer>
        </ButtonsContainer>
      )}
      <DynamicTitleContainer>
        <DynamicTitle
          $animation={isAnimating}
          onAnimationEnd={() => setIsAnimating(false)}
        >
          {title.toUpperCase()}
        </DynamicTitle>
      </DynamicTitleContainer>
    </PageWrapper>
  );
}

export default Home;
