import { createContext } from "react";

export const initialGame = {
  game: {
    isRunning: false,
    targetWord: "",
    isHard: false,
    allowRedo: false,
    nbOfTry: 2,
  },
  setGame: (game) => {},
};

export default createContext(initialGame);
