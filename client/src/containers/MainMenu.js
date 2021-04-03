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
    this.startInterval(2000); // checks current song every 2 seconds
  }

  componentDidUpdate (prevProps, prevState) {
    // every time the state of the song updates (new song, nothing playing), update modes
    // if no song playing
    if (!this.state.song) {
      this.startInterval(2000);
      this.fetchingLyrics = false;
    } else if (
      this.state.idle ||
      (
        prevState.song.artist && prevState.song.title &&
        (prevState.song.artist !== this.state.song.artist || prevState.song.title !== this.state.song.title)
      )
    ) {
      this.setState({ idle: false, idleCounter: 0 });
      this.startInterval(2000);

      this.setState({ song: {
        artist: this.state.song.artist,
        title: this.state.song.title
      },
      fetchingLyrics: true

      })
      this.props.onGetLyrics();
    }

  };

  // persistent checking for current song to update playback state
  // fetches song if available, otherwise times out to idle mode
  startInterval (interval) {
    window.clearInterval(this.state.timerId);
    this.setState({ timerId: setInterval(async () => {
      if (this.state.settings.autoRefresh) {
        await this.props.onGetCurrentSong();

        if (!this.state.song && !this.state.idle) {
          this.setState(prevState => ({ idleCounter: prevState.idleCounter + 1}));

          if (this.state.idleCounter >= this.state.idleMax) {
            this.setState({ idle: true });
            window.clearInterval(this.state.timerId);
          }
        } else if (
          this.state.settings.autoScrollLyrics
        ) {
          // scroll lyrics to position
        }
      }
    })})

  }


  render() {
    let notListening;
    let idle;
    let fetchingLyrics;

    if (!this.state.song) {
      notListening = <p>You're signed in to Spotify, but not listening to anything.</p>
    }

    if (this.state.idle) {
      idle = <button onClick={this.props.onGetCurrentSong}>You're idle! Click here to wake up Spotify Bars.</button>
    }

    if (this.state.fetchingLyrics) {
      fetchingLyrics = (
        <div>
          <p>Fetching lyrics for...</p>
          <span>{ this.state.song.title}</span>
          <span>{ this.state.song.artist}</span>
        </div>
      )
    }

    return (
      <div>
        <div>
          <div>
            <p>Lyrics</p>
            {notListening}
            {idle}
            {fetchingLyrics}
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
    lyrics: state.lyrics.lyrics,
    settings: state.settings.settings
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetCurrentSong: () => dispatch(actions.getCurrentSong()),
    onGetLyrics: () => dispatch(actions.getLyrics()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
