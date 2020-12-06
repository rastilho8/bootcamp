import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import Button from "@material-ui/core/Button";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import { makeStyles } from "@material-ui/styles";
import { motion } from "framer-motion";

const useStyle = makeStyles({
  root: {
    color: "green",
    padding: " 15px 20px",
    border: "5",
    borderColor: "green",
    fontSize: "20px",
    fontWeight: "bold",
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
    <motion.div
      initial={{ scale: 0 }}
      animate={{ rotate: 360, scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
    >
      <Button
        startIcon={<PlayCircleFilledIcon />}
        variant="contained"
        size="large"
        className={classes.root}
      >
        Play Game
      </Button>
    </motion.div>
  );
}

function Home() {
  return (
    <div className="centerButton">
      <Link to="/gameLobby" style={{ textDecoration: "none" }}>
        <StyleButton />
      </Link>
    </div>
  );
}

export default Home;
