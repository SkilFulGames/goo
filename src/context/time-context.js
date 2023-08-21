import { createContext } from "react";

export const initialTime = {
  timer: {
    isActive: false,
    isPaused: true,
    timeCounter: null,
  },
  setTimer: (timer) => {},
};

export default createContext(initialTime);
