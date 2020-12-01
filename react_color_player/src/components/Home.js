import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="centerButton">
      <Link to="/gameLobby">
        <button type="button" className="btn btn-outline-success btn-lg">
          Play Game
        </button>
      </Link>
    </div>
  );
}

export default Home;
