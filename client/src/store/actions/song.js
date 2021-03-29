import * as actionTypes from "./actionTypes";
import axios from "axios";

export const getCurrentSong = () => {
  return (dispatch, getState) => {
    // first dispatch immediate synchronous action to store to indicate you've started fetching the current song data
    dispatch(getCurrentSongStarted());

    // get request for current song
    axios
      .get("http://localhost:4000/api/getSong", { withCredentials: true })
      .then((res) => {
        console.log("Response: " + JSON.stringify(res.data));
        dispatch(getCurrentSongSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getCurrentSongFailure(err.message));
      });
  };
};

const getCurrentSongStarted = () => {
  return {
    type: actionTypes.GET_CURRENT_SONG_STARTED,
  };
};

const getCurrentSongSuccess = (currentSong) => {
  return {
    type: actionTypes.GET_CURRENT_SONG_SUCCESS,
    currentSong: currentSong,
  };
};

const getCurrentSongFailure = (error) => {
  return {
    type: actionTypes.GET_CURRENT_SONG_FAILURE,
    error: error,
  };
};
