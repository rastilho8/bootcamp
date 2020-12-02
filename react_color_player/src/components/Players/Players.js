import React, { useState, useContext } from "react";
import Player from "./Player";
import { PlayersContext } from "../../Context/PlayersContext";
import { Link } from "react-router-dom";
import "./players.css";

const Players = () => {
  const [players, setPlayers] = useContext(PlayersContext);

  const [getColor, setColor] = useState([
    {
      value: "imgDiv-red",
      label: "red",
      isDisabled: false,
    },
    {
      value: "imgDiv-blue",
      label: "blue",
      isDisabled: false,
    },
    {
      value: "imgDiv-green",
      label: "green",
      isDisabled: false,
    },
    {
      value: "imgDiv-purple",
      label: "purple",
      isDisabled: false,
    },
    {
      value: "imgDiv-orange",
      label: "orange",
      isDisabled: false,
    },
  ]);

  function changeColor(id, color, preColor, isDisabled) {
    let newArray = [...players];

    newArray[id - 1] = { ...newArray[id - 1], color: color };
    setPlayers(newArray);

    let newColorArray = [...getColor];

    //Find the pos of the new color to display
    let pos = newColorArray.findIndex((element) => {
      return element.value === color;
    });

    newColorArray[pos] = { ...newColorArray[pos], isDisabled: isDisabled };

    //Find the pos of the previous color to enable is selection again
    if (preColor !== "imgDiv-default") {
      let previousPos = newColorArray.findIndex((element) => {
        return element.value === preColor;
      });
      newColorArray[previousPos] = {
        ...newColorArray[previousPos],
        isDisabled: !isDisabled,
      };
    }

    setColor(newColorArray);
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
