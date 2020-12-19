import React, { useState, createContext } from "react";

export const PlayersContext = createContext();

export const PlayerProvider = (props) => {
  const [players, setPlayer] = useState([]);

  return (
    <PlayersContext.Provider value={[players, setPlayer]}>
      {props.children}
    </PlayersContext.Provider>
  );
};
