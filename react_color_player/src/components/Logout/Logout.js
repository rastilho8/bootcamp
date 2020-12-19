import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import "./logoutStyle.css";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import { projectFirestore, auth } from "../Firebase/firebase_conf";
import { PlayersContext } from "../../Context/PlayersContext";
import logout from "../Firebase/firebaseLogout";
import { useHistory } from "react-router-dom";
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

function changeState(
  { players, setShowModal, history, currentLobby },
  boolValue
) {
  setShowModal(false);

  if (boolValue === true) {
      
      players.map(async player => {
        let updatePlayer = {};
        updatePlayer[player.id] = {...player, color: "grey"};
        await projectFirestore.collection("lobby").doc(currentLobby).update(updatePlayer);
      })

    
  }
  logout(history);
}

const Logout = ({ showModal, setShowModal }) => {
  const [players] = useContext(PlayersContext);
  const { currentLobby } = useFirestore(auth.currentUser.uid);
  const classes = styleCard();
  const history = useHistory();

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
                Do you want to reset the game?
              </h2>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ marginRight: "10px" }}>
                  <Button
                    id={"myButton"}
                    variant="outlined"
                    color={"primary"}
                    size="large"
                    startIcon={<CheckCircleOutlineOutlinedIcon />}
                    onClick={() =>
                      changeState(
                        { players, setShowModal, currentLobby, history },
                        true
                      )
                    }
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
                      changeState({ players, setShowModal, history }, false);
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

export default Logout;
