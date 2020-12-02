import React from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.css";
import "./colors.css";

const Player = ({ player, colors, onChildClick }) => {
  const handleChange = (e) => {
    onChildClick(player.id, e.value, player.color, true);
  };

  return (
    <div className="card">
      <div className="card-front">
        <h3>{player.name}</h3>
        <Select
          className="mySelect"
          menuPortalTarget={document.body}
          value={colors.find((obj) => obj.value === colors)}
          options={colors}
          onChange={handleChange}
          isOptionDisabled={(option) => option.isDisabled === true}
        />
        <div className={`${player.color}`}></div>
      </div>
    </div>
  );
};

export default Player;
