import React from "react";
import styled from "styled-components";

const CustomH1 = styled.h1`
  margin: 0;
  padding: 10%;
  font-size: 175%;
  color: #ff9233;
  text-align: center;
`;

function DynamicSentence({ name, action }) {
  return (
    <div>
      <CustomH1>
        {action === "define"
          ? `${name} has defined a trick ?`
          : `Who's gonna take a letter ?`}
      </CustomH1>
    </div>
  );
}

export default DynamicSentence;
