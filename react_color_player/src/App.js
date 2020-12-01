import "./App.css";
import Players from "./components/Players";
import Header from "./components/Header";
import Home from "./components/Home";
import { PlayerProvider } from "./components/PlayersContext";
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
