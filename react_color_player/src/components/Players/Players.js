import React, { useState, useContext, useEffect } from "react";
import Player from "./Player";
import "../../App.css";
import { PlayersContext } from "../../Context/PlayersContext";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import BackspaceIcon from "@material-ui/icons/Backspace";
import Grid from "@material-ui/core/Grid";
import { motion } from "framer-motion";
import Container from "@material-ui/core/Container";
import SaveIcon from "@material-ui/icons/Save";
import ParticleAnimation from "react-particle-animation";
import useFirestore from "../Firebase/firebaseStore";
import { auth } from "../Firebase/firebase_conf";

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

function StyleButtonHome({ setShowModal }) {
  const classes = useStyle();
  return (
    <Button
      startIcon={<BackspaceIcon />}
      variant="contained"
      size="large"
      className={classes.root}
      onClick={() => {
        setShowModal(true);
      }}
    >
      Logout
    </Button>
  );
}

function StyleButtonSave({ setShowModal }) {
  const classes = useStyle();
  return (
    <Button
      endIcon={<SaveIcon />}
      variant="contained"
      size="large"
      className={classes.root}
      onClick={() => {
        setShowModal(true);
      }}
    >
      Save
    </Button>
  );
}

const Players = ({ setShowModalSave, setShowModalLogout }) => {
  const { currentLobby, players, setPlayers, url } = useFirestore(
    auth.currentUser.uid
  );

  const [test, setTest] = useContext(PlayersContext);

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

  useEffect(() => {
    let newColorArray = [...getColor];
    players.map((player) => {
      let pos = newColorArray.findIndex((element) => {
        return element.value === player.color;
      });

      newColorArray[pos] = { ...newColorArray[pos], isDisabled: true };

      setColor(newColorArray);

      return;
    });
    setTest(players);
  }, [players]);

  function changeColor(id, color, preColor, isDisabled) {
    let newArray = [...players];

    let posi = newArray.findIndex((element) => {
      return element.id === id;
    });

    newArray[posi] = { ...newArray[posi], color: color };
    setPlayers(newArray);

    let newColorArray = [...getColor];

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
      <ParticleAnimation
        numParticles={400}
        background={{ r: 0, g: 0, b: 0, a: 0.6 }}
        color={{ r: 9, g: 84, b: 8, a: 255 }}
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          zIndex: "-1",
        }}
      />
      <div className="container">
        <Grid container spacing={10}>
          {players.map((player) => (
            <Grid key={player.id} item sm={6}>
              <motion.div
                initial={{ scale: 2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5 }}
              >
                <Player
                  key={player.id}
                  player={player}
                  colors={getColor}
                  url={url}
                  currentId={auth.currentUser.uid}
                  onChildClick={changeColor}
                ></Player>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        <div className="center">
          <Container style={{ padding: "0px" }}>
            <motion.div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0px",
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.5 }}
            >
              <StyleButtonHome setShowModal={setShowModalLogout} />

              <StyleButtonSave setShowModal={setShowModalSave} />
            </motion.div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Players;
