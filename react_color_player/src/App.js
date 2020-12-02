import "./App.css";
import Players from "./components/Players/Players";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import { PlayerProvider } from "./Context/PlayersContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <Header />
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <PlayerProvider>
            <Route path="/gameLobby" component={Players} />
          </PlayerProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
