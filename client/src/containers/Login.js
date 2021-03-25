import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Login extends Component {
  state = {
    loggedIn: false
  }

  render() {
    return (
      <div>
        <h1>Spotify Bars</h1>
        <h3>
          Real-time lyrics for the song you're currently listening to on
          Spotify!
        </h3>
      </div>
    );
  }
}

export default Login;
