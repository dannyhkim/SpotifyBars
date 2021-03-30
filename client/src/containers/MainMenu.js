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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetCurrentSong: () => dispatch(actions.getCurrentSong()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
