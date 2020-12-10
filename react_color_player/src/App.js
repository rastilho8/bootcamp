import "./App.css";
import Players from "./components/Players/Players";
import Header from "./components/Header/Header";
import Save from "./components/SaveFirebase/Save";
import Home from "./components/Home/Home";
import { PlayerProvider } from "./Context/PlayersContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState} from "react";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [reset, setReset] = useState(false);
  return (
    <>
      <Header />
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <PlayerProvider>
            <Save reset = {reset}  setReset={setReset} showModal={showModal} setShowModal={setShowModal} />
            <Route path="/gameLobby" exact>
              <Players setReset={setReset} showModal={showModal} setShowModal={setShowModal} />
            </Route>
          </PlayerProvider>
        </Switch>
      </Router>
    </>
  );
}

export default App;
