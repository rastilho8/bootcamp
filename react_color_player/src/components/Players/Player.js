import React from "react";
import Select from "react-select";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const styleCard = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    height: "260px",
    backgroundColor: ({ player }) => `${player.color}`,
    "&:hover": {
      opacity: "0.9",
    },
    "&:focus": {
      outline: "none",
    },
  },
});

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: "black",
    opacity: state.isDisabled ? "0.5" : "1",
  }),
};

function StyleCard({ player, colors, handleChange }) {

  const classes = styleCard({ player });
  return (
    <Paper className={classes.root} >
      <Container style={{ width: "70%"}}>
        <Typography
          variant="h4"
          style={{
            paddingBottom: "15px",
            color: player.color !== "grey" ? "white" : "black",
          }}
        >
          {player.name}
        </Typography>
        <Select
          styles={customStyles}
          menuPortalTarget={document.body}
          value={colors.find((obj) => obj.value === colors)}
          options={colors}
          onChange={handleChange}
          isOptionDisabled={(option) => option.isDisabled === true}
        />
      </Container>
    </Paper>
  );
}

const Player = ({ player, colors, onChildClick }) => {
  const handleChange = (e) => {
    onChildClick(player.id, e.value, player.color, true);
  };

  return (
    <StyleCard player={player} colors={colors} handleChange={handleChange} />
  );
};

export default Player;
