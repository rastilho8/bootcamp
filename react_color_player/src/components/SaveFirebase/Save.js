import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import "./saveStyle.css";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import { projectFirestore, auth } from "../Firebase/firebase_conf";
import { PlayersContext } from "../../Context/PlayersContext";
import useFirestore from "../Firebase/firebaseStore";

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

const savePlayers = ({ currentLobby, play, setShowModal }) => {

  let pos = play.findIndex((element) => {
    return element.id === auth.currentUser.uid;
  });

  var updatePlayer = {};
  updatePlayer[auth.currentUser.uid] = play[pos];
  projectFirestore.collection("lobby").doc(currentLobby).update(updatePlayer);
  
  setShowModal(false);
};

const Save = ({ showModal, setShowModal }) => {
  const { currentLobby } = useFirestore(auth.currentUser.uid);
  const [play] = useContext(PlayersContext);
  
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
              <h2 style={{ marginBottom: "30px" }}>
                Do you want to save the game?
              </h2>

              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ marginRight: "10px" }}>
                  <Button
                    id={"myButton"}
                    variant="outlined"
                    color={"primary"}
                    size="large"
                    startIcon={<CheckCircleOutlineOutlinedIcon />}
                    onClick={() => {
                      savePlayers({ currentLobby, play, setShowModal });
                    }}
                  >
                    YES
                  </Button>
                </div>
                <div>
                  <Button
                    variant="outlined"
                    color={"secondary"}
                    size="large"
                    startIcon={<NotInterestedIcon />}
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    NO
                  </Button>
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
