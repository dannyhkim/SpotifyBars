import React, { Component } from "react";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";

class MainMenu extends Component {
  state = {
    song: this.props.currentSong,
    lyrics: this.props.lyrics,
    settings: this.props.settings,

    fetchingLyrics: false,
    idle: false,
    idleCounter: 0,
    idleMax: 20,
    timerId: null,
  };

  componentDidMount () {
    this.props.onGetCurrentSong();
  }

  // persistent checking for current song to update playback state
  // fetches song if available, otherwise times out to idle mode
  startInterval (interval) {
    window.clearInterval(this.state.timerId);


  }


  render() {

    return (
      <div>
        <div>
          <h1>You're not listening to anything currently.</h1>
          <div>
            <p>Lyrics</p>
            <button onClick={this.props.onGetLyrics}>Get Lyrics</button>
            <p>{this.props.lyrics ? this.props.lyrics : "No lyrics yet"}</p>
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
