import React, { useState, useContext } from "react";
import Player from "./Player";
import { PlayersContext } from "../../Context/PlayersContext";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import BackspaceIcon from "@material-ui/icons/Backspace";
import Grid from "@material-ui/core/Grid";
import { motion } from "framer-motion";

const useStyle = makeStyles({
  root: {
    color: "green",
    padding: " 15px 20px",
    border: "5",
    borderColor: "green",
    fontSize: "20px",
    fontWeight: "bold",
    marginTop: "20px",
    "&:hover": {
      opacity: "0.8",
    },
    "&:focus": {
      outline: "none",
    },
  },
});

function StyleButton() {
  const classes = useStyle();
  return (
    <Button
      startIcon={<BackspaceIcon />}
      variant="contained"
      size="large"
      className={classes.root}
    >
      Go To Game Lobby
    </Button>
  );
}

const Players = () => {
  const [players, setPlayers] = useContext(PlayersContext);

  const [getColor, setColor] = useState([
    {
      value: "red",
      label: "red",
      isDisabled: false,
    },
    {
      value: "blue",
      label: "blue",
      isDisabled: false,
    },
    {
      value: "green",
      label: "green",
      isDisabled: false,
    },
    {
      value: "purple",
      label: "purple",
      isDisabled: false,
    },
    {
      value: "orange",
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
    if (preColor !== "grey") {
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
      <Grid container spacing={10}>
        {players.map((player) => (
          <Grid
            key={player.id}
            item
            sm={6}
          >
            <motion.div
            initial={{scale: 2}} 
           animate={{ scale: 1 }}
           transition={{ duration: 1.5 }}>
            <Player
              key={player.id}
              player={player}
              colors={getColor}
              onChildClick={changeColor}
            ></Player>
            </motion.div>
          </Grid>
        ))}
      </Grid>
      <div className="center">
        <Link to="/" style={{ textDecoration: "none" }}>
          <StyleButton />
        </Link>
      </div>
    </div>
  );
};

export default Players;
