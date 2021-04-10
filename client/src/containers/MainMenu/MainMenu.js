import React, { Component } from "react";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Cookies from "js-cookie";

import Lyrics from "../../components/Lyrics/Lyrics";
import Navbar from "../../components/Navbar/Navbar";

import classes from "./MainMenu.module.css";

class MainMenu extends Component {
  state = {
    fetchingLyrics: false,
    idle: false,
    idleCounter: 0,
    idleMax: 20,
  };

  componentDidMount() {
    if (!this.isLoggedIn) {
      this.props.history.replace("/login");
    }
    this.startInterval(2000); // checks for current song every 2 seconds
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  componentDidUpdate(prevProps, prevState) {
    // every time the state of the song updates (new song, nothing playing), update modes

    // Possibilities for updating

    // no song playing to a song playing
    if (!prevProps.currentSong && this.props.currentSong) {
      this.setState({ idle: false, idleCounter: 0 });

      this.startInterval(2000);
      this.setState({ fetchingLyrics: true });
      this.props.onGetLyrics().then(() => {
        this.setState({ fetchingLyrics: false });
      });
    } // switch from one currently playing song to another song
    else if (this.props.currentSong) {
      if (
        prevProps.currentSong.title !== this.props.currentSong.title ||
        prevProps.currentSong.artist !== this.props.currentSong.artist
      ) {
        this.setState({ idle: false, idleCounter: 0 });

        this.startInterval(2000);
        this.setState({ fetchingLyrics: true });
        this.props.onGetLyrics().then(() => {
          this.setState({ fetchingLyrics: false });
        });
      }
    } else {
      // song playing to no song playing
      this.startInterval(2000);
    }
  }

  isLoggedIn() {
    return Cookies.get("loggedIn");
  }

  // persistent checking for current song to update playback state
  // fetches song if available, otherwise times out to idle mode
  startInterval(interval) {
    clearInterval(this.timerId);
    this.timerId = setInterval(async () => {
      if (this.props.settings.autoRefresh) {
        await this.props.onGetCurrentSong();

        if (!this.props.currentSong && !this.state.idle) {
          this.setState((prevState) => ({
            idleCounter: prevState.idleCounter + 1,
          }));

          if (this.state.idleCounter >= this.state.idleMax) {
            this.setState({ idle: true });
            clearInterval(this.timerId);
          }
        } else if (this.props.settings.autoScrollLyrics) {
          // scroll lyrics to position
        }
      }
    }, interval);
  }

  render() {
    let notListening;
    let idle;
    let fetchingLyrics;
    let lyrics;

    if (!this.props.currentSong) {
      notListening = (
        <p>You're signed in to Spotify, but not listening to anything.</p>
      );
    }

    if (this.state.idle) {
      idle = (
        <p
          style={{ color: "#1DB954", fontSize: "20px", cursor: "pointer" }}
          onClick={this.props.onGetCurrentSong}
        >
          You're idle! Click here to wake up Spotify Bars.
        </p>
      );
    }

    if (this.state.fetchingLyrics) {
      fetchingLyrics = (
        <div>
          <p style={{ color: "#000" }}>
            Fetching lyrics for...
            <span style={{ color: "#1DB954" }}>
              {this.props.currentSong.title}
            </span>
            <span style={{ fontWeight: "bold" }}>
              {" "}
              by {this.props.currentSong.artist}
            </span>
          </p>
        </div>
      );
    }

    if (!this.state.fetchingLyrics && this.props.currentSong) {
      lyrics = <Lyrics />;
    }

    return (
      <div className={classes}>
        <Navbar />
        <h1 style={{ fontSize: "60px", color: "#000" }}>Lyrics</h1>
        {notListening}
        {idle}
        {fetchingLyrics}
        {lyrics}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentSong: state.song.currentSong,
    loading: state.song.loading,
    lyrics: state.lyrics.lyrics,
    settings: state.settings.settings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetCurrentSong: () => dispatch(actions.getCurrentSong()),
    onGetLyrics: () => dispatch(actions.getLyrics()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
