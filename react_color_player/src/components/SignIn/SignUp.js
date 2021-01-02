import React, { useEffect, useState } from "react";
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
    height: "400px",
    backgroundColor: "white",
    borderRadius: "10px",
    color: "black",
  },
});

const addUser = ({ email, name, pass, setSignUp, setError, file, setFile }) => {
  if (email !== "" && pass !== "" && file !== null && name !== "") {
    Register(email, name, pass, setError, setSignUp, file, setFile);
  } else {
    setError("Please fill all the fields");
  }
};

const SignUp = ({ showSignUp, setSignUp }) => {
  const classes = styleCard();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);
  const [colorButton, setColorButton] = useState("red");

  const [file, setFile] = useState(null);
  const types = ["image/png", "image/jpeg"];

  const handleChange = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file (png or jpg)");
    }
  };

  useEffect(() => {
    if (file) {
      setColorButton("green");
    } else {
      setColorButton("red");
    }
  }, [file]);

  const closeChange = () => {
    setSignUp(false);
    setFile(null);
  };

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
                onClick={() => closeChange()}
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
                  <Button
                    style={{ backgroundColor: colorButton, color: "white" }}
                    variant="contained"
                    component="label"
                    onChange={(e) => handleChange(e)}
                  >
                    Upload File
                    <input type="file" hidden />
                  </Button>
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
                    addUser({
                      email,
                      name,
                      pass,
                      setSignUp,
                      error,
                      setError,
                      file,
                      setFile
                    })
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
