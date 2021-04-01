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
    timerId: null,
    interval: 2000, // do every 2 seconds
    settings: this.props.settings,
    idleCounter: 0,
    idleMax: 20
  };

  startInterval (interval) {
    window.clearInterval(this.state.timerId);
    this.setState({ timerId: setInterval(async () => {
      if (this.settings.autoRefresh) {
        await this.props.onGetCurrentSong();

        if (!this.state.song && !this.idle) {
          // need to set idle counter

          if (this.state.idleCounter >= this.state.idleMax) {
            this.setState({ idle: true });
            window.clearInterval(this.state.timerId);
          }
        } else if (this.settings.scrolling && !this.draggingLyrics) {

        }
      }
    }, interval) })

  }

  componentDidMount () {
    this.props.onGetCurrentSong();
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
