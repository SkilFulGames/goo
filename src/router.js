import React from "react";
import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "./error-page";
import Home from "./pages/home";
import Player from "./pages/player";
import Game from "./pages/game";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/player",
    element: <Player />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/game",
    element: <Game />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
