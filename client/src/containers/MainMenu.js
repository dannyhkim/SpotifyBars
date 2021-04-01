import React, { Component } from "react";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";

class MainMenu extends Component {
  state = {
    idle: false,
    fetchingLyrics: false,
    user: null,
    error: null,
    song: this.props.currentSong,
    lyrics: this.props.lyrics,
  };

  componentDidMount () {
    this.props.onGetCurrentSong();

    if (this.state.song) {
      this.props.onGetLyrics();
    }
  }

  componentDidUpdate () {
    this.props.onGetLyrics();
  }

  render() {
    return (
      <div>
        <div>
          <h1>You're not listening to anything currently.</h1>
          <div>
            <p>Lyrics</p>
            <p>{this.state.lyrics}</p>
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
