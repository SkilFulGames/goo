import styled from "styled-components";

export const PageWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100svh;
  background: #071f36;
`;

export const Background = styled.div`
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
