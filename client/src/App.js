import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./containers/Login";
import MainMenu from "./containers/MainMenu";
import "./App.css";

function App() {

  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/mainmenu">Main Menu</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
        </div>

        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/mainmenu">
            <MainMenu />
          </Route>
          <Route path="/">
            <p>You haven't logged in yet.</p>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
