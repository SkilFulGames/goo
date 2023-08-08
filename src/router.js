import React, { useState } from "react";
import { createBrowserRouter } from "react-router-dom";

import GameContext, { initialGame } from "./context/game-context";
import PlayerContext, { initialPlayers } from "./context/player-context";

import ErrorPage from "./error-page";
import Home from "./pages/home";
import Player from "./pages/player";
import Game from "./pages/game";

function ContextInjectElement({ Children }) {
  const [game, setGame] = useState(initialGame.game);
  const [players, setPlayers] = useState(initialPlayers.players);
  return (
    <GameContext.Provider value={{ game, setGame }}>
      <PlayerContext.Provider value={{ players, setPlayers }}>
        {Children}
      </PlayerContext.Provider>
    </GameContext.Provider>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <ContextInjectElement Children={<Home />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/player",
    element: <ContextInjectElement Children={<Player />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/game",
    element: <ContextInjectElement Children={<Game />} />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
