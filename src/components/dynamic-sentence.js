import React, { useContext } from "react";
import styled from "styled-components";

import PlayerContext from "../context/player-context";

const CustomH1 = styled.h1`
  margin: 0;
  padding: 10%;
  font-size: 175%;
  color: #ff9233;
`;

function DynamicSentence({ name, action }) {
  const { players } = useContext(PlayerContext);

  return (
    <div>
      <CustomH1>
        {action === "define"
          ? `${name} have defined ?`
          : `Who's gonne take a letter from ${name} ?`}
      </CustomH1>
    </div>
  );
}

export default DynamicSentence;
