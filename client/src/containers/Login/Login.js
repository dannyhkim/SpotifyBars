import React, { Component } from "react";
import classes from './Login.module.css';

class Login extends Component {

  render() {
    return (
      <div className={classes}>
        <h1 className={classes.title}>Spotify Bars</h1>
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
