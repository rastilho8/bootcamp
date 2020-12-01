import React, { useState, createContext } from "react";

export const PlayersContext = createContext();

export const PlayerProvider = (props) => {
  const [players, setPlayer] = useState([
    {
      id: "1",
      name: "Player1",
      color: "#fff",
    },
    {
      id: "2",
      name: "Player2",
      color: "#fff",
    },
    {
      id: "3",
      name: "Player3",
      color: "#fff",
    },
    {
      id: "4",
      name: "Player4",
      color: "#fff",
    },
  ]);

  return (
    <PlayersContext.Provider value={[players, setPlayer]}>
      {props.children}
    </PlayersContext.Provider>
  );
};
