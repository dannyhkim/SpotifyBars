import React, { Component } from "react";
import axios from "axios";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";

class MainMenu extends Component {
  state = {
    loggedIn: false,
    user: null,
    error: null,
    song: null,
  };

  render() {
    return (
      <div>
        <div>
          <h1>Welcome!</h1>
          <div>
            <button onClick={this.props.onGetCurrentSong}>Get Current Song</button>
            <button onClick={this.props.onGetLyrics}>Get lyrics</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentSong: state.song.currentSong,
    loading: state.song.loading,
    lyrics: state.lyrics.lyrics
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetCurrentSong: () => dispatch(actions.getCurrentSong()),
    onGetLyrics: () => dispatch(actions.getLyrics()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
