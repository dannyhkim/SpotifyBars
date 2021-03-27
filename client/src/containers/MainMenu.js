import React, { Component } from "react";
import axios from 'axios';

class MainMenu extends Component {
  state = {
    loggedIn: false,
    user: null,
    error: null,
    song: null,
  };

  getCurrentSong = () => {
    axios
      .get("http://localhost:4000/api/getSong", { withCredentials: true })
      .then((res) => {
        if (res.status === 200)
        console.log("response: " + JSON.stringify(res.data));
        return res.json();
        throw new Error("failed to authenticate user");
      })
      .then((json) => {
        this.setState({ loggedIn: true, song: json });
        console.log("Current song:" + JSON.stringify(json));
      })
      .catch((err) => {
        this.setState({
          loggedIn: false,
          error: "failed to authenticate user",
        });
      });
  };

  render() {
    return (
      <div>
        <div>
          <h1>Welcome!</h1>
          <div>
            <h2>Welcome!</h2>
            <button onClick={this.getCurrentSong}>Get Current Song</button>
          </div>
        </div>
      </div>
    );
  }
}

export default MainMenu;
