import React, { useContext } from "react";
import Player from "./Player";
import { PlayersContext } from "./PlayersContext";
import { Link } from "react-router-dom";

const Players = () => {
  const [players, setPlayers] = useContext(PlayersContext);

  const getColor = [
    {
      value: "#cc0000",
      label: "red",
    },
    {
      value: "#01036e",
      label: "blue",
    },
    {
      value: "#016e29",
      label: "green",
    },
    {
      value: "#55016e",
      label: "purple",
    },
    {
      value: "#ad5a00",
      label: "orange",
    },
  ];

  function changeColor(id, color) {
    if (players.some((e) => e.color === color)) {
      alert("Please choose a color different from the other players");
    } else {
      let newArray = [...players];

      newArray[id - 1] = { ...newArray[id - 1], color: color };
      setPlayers(newArray);
    }
  }

  return (
    <div>
      <section className="cards">
        {players.map((player) => (
          <Player
            key={player.id}
            player={player}
            colors={getColor}
            onChildClick={changeColor}
          ></Player>
        ))}
      </section>
      <div className="center">
        <Link to="/">
          <button type="button" className="btn btn-outline-success btn-lg mt-5">
            Go To Game Lobby
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Players;
