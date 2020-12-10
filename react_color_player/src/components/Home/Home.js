import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import Button from "@material-ui/core/Button";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import { makeStyles } from "@material-ui/styles";
import { motion } from "framer-motion";
import ParticleAnimation from "react-particle-animation";

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
    <Button
      startIcon={<PlayCircleFilledIcon />}
      variant="contained"
      size="large"
      className={classes.root}
    >
      Play Game
    </Button>
  );
}

function Home() {
  return (
    <div>
      <ParticleAnimation
        numParticles={400}
        background={{r: 0, g: 0, b: 0, a: 0.6}}
        color={{r: 9, g: 84, b: 8, a: 255}}
        style={{
          position: "absolute",
          top: '0',
          left: '0',
          width: "100%",
          height: "100%",
          zIndex: '-1'
        }}
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="centerButton">
          <div className="backImgLogo">
            <svg className="mySvg">
              <filter id="wavy">
                <feTurbulence
                  x="0"
                  y="0"
                  baseFrequency="0.009"
                  numOctaves="5"
                  seed="2"
                >
                  <animate
                    attributeName="baseFrequency"
                    dur="60s"
                    values="0.02;0.05;0.02"
                    repeatCount="indefinite"
                  ></animate>
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" scale="30" />
              </filter>
            </svg>
          </div>

          <Link to="/gameLobby" style={{ textDecoration: "none" }}>
            <StyleButton />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;
