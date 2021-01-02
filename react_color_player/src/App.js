import "./App.css";
import Players from "./components/Players/Players";
import Header from "./components/Header/Header";
import Save from "./components/SaveFirebase/Save";
import Home from "./components/Home/Home";
import SignUp from "./components/SignIn/SignUp";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import { PlayerProvider } from "./Context/PlayersContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState } from "react";

function App() {
  const [showModalSave, setShowModalSave] = useState(false);
  const [showModalLogout, setShowModalLogout] = useState(false);
  const [showSignUp, setSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <Header />
      <Router>
        <Switch>
          <Route path="/" exact>
            <SignUp showSignUp={showSignUp} setSignUp={setSignUp}/>
            <Login showLogin={showLogin} setShowLogin={setShowLogin} />
            <Home setShowLogin={setShowLogin} setSignUp={setSignUp}  />
          </Route>
          <PlayerProvider>
            <Save showModal={showModalSave} setShowModal={setShowModalSave} />
            <Logout
              showModal={showModalLogout}
              setShowModal={setShowModalLogout}
            />

            <Route path="/gameLobby" exact>
              <Players
                showModalSave={showModalSave}
                setShowModalSave={setShowModalSave}
                showModalLogout={showModalLogout}
                setShowModalLogout={setShowModalLogout}
              />
            </Route>
          </PlayerProvider>
        </Switch>
      </Router>
    </>
  );
}

export default App;
