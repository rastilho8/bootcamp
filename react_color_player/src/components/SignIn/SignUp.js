import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import "./SignUp.css";
import CancelIcon from "@material-ui/icons/Cancel";
import IconButton from "@material-ui/core/IconButton";
import Register from "../Firebase/firebaseRegister";

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
    justifyContent: "center",
    height: "350px",
    backgroundColor: "white",
    borderRadius: "10px",
    color: "black",
  },
});

const addUser = ({ email, name, pass, setSignUp, setError }) => {
  if (email !== "" && pass !== "") {
     Register(email, name, pass, setError, setSignUp );
     
  } else {
    alert("please provide a valid user or password");
  }
};

const SignUp = ({ showSignUp, setSignUp }) => {
  const classes = styleCard();


  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);

  return (
    <AnimatePresence exitBeforeEnter>
      {showSignUp && (
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
              <IconButton
                style={{
                  position: "absolute",
                  right: "0",
                  top: "0",
                  color: "red",
                }}
                onClick={() => setSignUp(false)}
              >
                <CancelIcon />
              </IconButton>
              <h1
                style={{ padding: "10px", textAlign: "center", color: "green" }}
              >
                Sign Up
              </h1>
              <Container>
                <form noValidate autoComplete="off">
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    type="email"
                    style={{ width: "100%", marginBottom: "10px" }}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    id="name"
                    label="Player Name"
                    variant="outlined"
                    type="text"
                    style={{ width: "100%", marginBottom: "10px" }}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    style={{ width: "100%", marginBottom: "10px" }}
                    onChange={(e) => setPass(e.target.value)}
                  />
                </form>
              </Container>
              <Container style={{ textAlign: "center", padding: "10px" }}>
                <p style={{ marginBottom: "10px", color: "red" }}>{error}</p>
                <Button
                  variant="outlined"
                  style={{
                    color: "green",
                    borderColor: "green",
                    fontSize: "20px",
                  }}
                  onClick={() =>
                    addUser({ email, name, pass, setSignUp, error, setError })
                  }
                >
                  Register
                </Button>
              </Container>
            </Paper>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignUp;
