import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import "./saveStyle.css";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import { projectFirestore } from "../Firebase/firebase_conf";
import { PlayersContext } from "../../Context/PlayersContext";
import { Link } from "react-router-dom";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
    y: "350px",
    transition: { delay: 0.5 },
  },
};

const styleCard = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    height: "200px",
    backgroundColor: "white",
    borderRadius: "10px",
    color: "black",
  },
});

const savePlayers = ({ players, setShowModal }) => {
  const collectionRef = projectFirestore.collection("players");

  players.map(async (player) => {
    const idPlayer = player.id;
    const color = player.color;
    const name = player.name;
    await collectionRef.doc(idPlayer).set({ name, color });
  });

  setShowModal(false);
};

function changeState({ players, setReset, setShowModal }, boolValue) {
  setReset(boolValue);
  setShowModal(false);
  if (boolValue === true) {
    const collectionRef = projectFirestore.collection("players");

    players.map(async (player) => {
      const idPlayer = player.id;
      const color = "grey";
      const name = player.name;
      await collectionRef.doc(idPlayer).set({ name, color });
    });
      setReset(false);
  }
}

const Save = ({ showModal, setShowModal, reset, setReset }) => {
  const [players] = useContext(PlayersContext);
  const classes = styleCard();

  return (
    <AnimatePresence exitBeforeEnter>
      {showModal && (
        <motion.div
          className="backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            style={{ margin: "0 auto", maxWidth: "400px" }}
            variants={modal}
          >
            <Paper className={classes.root} elevation={3}>
              {reset ? (
                <h2 style={{ marginBottom: "30px" }}>
                  Do you want to reset the game?
                </h2>
              ) : (
                <h2 style={{ marginBottom: "30px" }}>
                  Do you want to save the game?
                </h2>
              )}
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ marginRight: "10px" }}>
                  <Link to={"/"}  style={{textDecoration: 'none'}} >
                    <Button
                      id={"myButton"}
                      variant="outlined"
                      color={"primary"}
                      size="large"
                      startIcon={<CheckCircleOutlineOutlinedIcon />}
                      onClick={() => {
                        reset
                          ? changeState(
                              { players, setReset, setShowModal },
                              true
                            )
                          : savePlayers({ players, setShowModal });
                      }}
                    >
                      YES
                    </Button>
                  </Link>
                </div>
                <div>
                  {reset ? (
                    <Link to={"/"} style={{textDecoration: 'none'}}>
                      <Button
                        variant="outlined"
                        color={"secondary"}
                        size="large"
                        startIcon={<NotInterestedIcon />}
                        onClick={() => {
                          reset
                            ? changeState(
                                { players, setReset, setShowModal },
                                false
                              )
                            : setShowModal(false);
                        }}
                      >
                        NO
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="outlined"
                      color={"secondary"}
                      size="large"
                      startIcon={<NotInterestedIcon />}
                      onClick={() => {
                        reset
                          ? changeState(
                              { players, setReset, setShowModal },
                              false
                            )
                          : setShowModal(false);
                      }}
                    >
                      NO
                    </Button>
                  )}
                </div>
              </div>
            </Paper>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Save;
