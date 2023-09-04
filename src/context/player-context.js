import { createContext } from "react";

export const initialPlayers = {
  players: [
    {
      name: "Player 1",
      letter: "",
      position: 1,
      redo: false,
      nbOfTry: 2,
      stats: {
        nbDef: 0,
        nbFailedDef: 0,
        nbCopied: 0,
        nbFailedTry: 0,
        nbLetterGiven: 0,
      },
    },
    {
      name: "Player 2",
      letter: "",
      position: 2,
      redo: false,
      nbOfTry: 2,
      stats: {
        nbDef: 0,
        nbFailedDef: 0,
        nbCopied: 0,
        nbFailedTry: 0,
        nbLetterGiven: 0,
      },
    },
  ],
  setPlayers: (players) => {},
};

export default createContext(initialPlayers);
