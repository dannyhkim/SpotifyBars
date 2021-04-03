import React, { Component } from "react";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";

class MainMenu extends Component {
  state = {
    fetchingLyrics: false,
    idle: false,
    idleCounter: 0,
    idleMax: 20,
  };

  componentDidMount() {
    this.startInterval(2000); // checks current song every 2 seconds
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  componentDidUpdate(prevProps, prevState) {
    // every time the state of the song updates (new song, nothing playing), update modes
    // if no song playing

    // SOME ISSUE WITH COMPONENTDIDUPDATE. FETCHING LYRICS ONLY WORKS WHEN SWITCHING SONGS.
    // when component mounts, starts looking for song, but componentDidUpdate gets called rather quickly before the song is retrieved as props
    console.log(
      "prevProps currentSong: " + JSON.stringify(prevProps.currentSong)
    );
    if (!prevProps.currentSong || !this.props.currentSong) {
      console.log("theres no song");
      this.startInterval(2000);
      // this.setState({ fetchingLyrics: false });
    } else if (
      prevProps.currentSong.title !== this.props.currentSong.title ||
      prevProps.currentSong.artist !== this.props.currentSong.artist
    ) {
      this.setState({ idle: false, idleCounter: 0 });

      this.startInterval(2000);
      this.setState({ fetchingLyrics: true });
      this.props.onGetLyrics().then(() => {
        this.setState({ fetchingLyrics: false });
      });
      console.log("is this getting called continuously?");
    }
  }

  // persistent checking for current song to update playback state
  // fetches song if available, otherwise times out to idle mode
  startInterval(interval) {
    clearInterval(this.timerId);
    this.timerId = setInterval(async () => {
      // if (this.props.settings.autoRefresh) {
        await this.props.onGetCurrentSong();

        if (!this.props.currentSong && !this.state.idle) {
          this.setState((prevState) => ({
            idleCounter: prevState.idleCounter + 1,
          }));

          if (this.state.idleCounter >= this.state.idleMax) {
            this.setState({ idle: true });
            clearInterval(this.timerId);
          }
        }
        else if (this.props.settings.autoScrollLyrics) {
          // scroll lyrics to position
        }
      // }
    }, interval);
  }

  render() {
    let notListening;
    let idle;
    let fetchingLyrics;

    if (!this.props.currentSong) {
      notListening = (
        <p>You're signed in to Spotify, but not listening to anything.</p>
      );
    }

    if (this.state.idle) {
      idle = (
        <button onClick={this.props.onGetCurrentSong}>
          You're idle! Click here to wake up Spotify Bars.
        </button>
      );
    }

    if (this.state.fetchingLyrics) {
      fetchingLyrics = (
        <div>
          <p>
            Fetching lyrics for...
            <span>{this.props.currentSong.title} </span>
            <span>{this.props.currentSong.artist}</span>
          </p>
        </div>
      );
    }

    return (
      <div>
        <div>
          <div>
            <p>Lyrics</p>
            {notListening}
            {idle}
            {fetchingLyrics}
            {this.state.fetchingLyrics ? null : this.props.lyrics}
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
