import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
  state = {
    loggedIn: false,
    user: null,
    error: null
  }

  componentDidMount() {
    fetch('http://localhost:4000/auth/spotify', {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(res => {
        if(res.status === 200) return res.json();
        throw new Error('failed to authenticate user');
      })
      .then(res => {
        this.setState({ loggedIn: true, user: res.user })
      })
      .catch(err => {
        this.setState({
          loggedIn: false,
          error: "failed to authenticate user"
        })
      })
  }

  render() {
    return (
      <div>
        <h1>Spotify Bars</h1>
        <h3>
          Real-time lyrics for the song you're currently listening to on
          Spotify!
        </h3>
        <a href="http://localhost:4000/auth/spotify">Sign in with Spotify</a>
      </div>
    );
  }
}

export default Login;
