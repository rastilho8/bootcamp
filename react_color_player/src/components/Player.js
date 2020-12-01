import React from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.css";

const Player = ({ player, colors, onChildClick }) => {
  const handleChange = (e) => {
    onChildClick(player.id, e.value);
  };

  return (
    <div className="card">
      <div className="card-front">
        <div className="container mt-2">
          <h3>{player.name}</h3>
          <Select
            className="mySelect"
            value={colors.find((obj) => obj.value === colors)}
            options={colors}
            onChange={handleChange}
          />
          <div
            className="imgDiv"
            style={{ backgroundColor: `${player.color}` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Player;
