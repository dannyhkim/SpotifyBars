import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
  state = {
    loggedIn: false,
    user: null,
    error: null
  }

  render() {
    return (
      <div>
        <h1>Spotify Bars</h1>
        <h3>
          Real-time lyrics for the song you're currently listening to on
          Spotify! You haven't logged in yet!
        </h3>
        <a href="http://localhost:4000/auth/spotify">Sign in with Spotify</a>
      </div>
    );
  }
}

export default Login;
