import * as actionTypes from "./actionTypes";
import axios from "axios";

export const getCurrentSong = () => {
  return (dispatch, getState) => {
    // first dispatch immediate synchronous action to store to indicate you've started fetching the current song data
    dispatch(getCurrentSongStarted());

    return new Promise((resolve, reject) => {
      // get request for current song
      axios
        .get("/api/fetchSong", { withCredentials: true })
        .then((res) => {
          const data = res.data;

          if (data.err) {
            return reject(data.err);
          }

          const result = data.result.body;
          let songData = null;

          if (result.is_playing) {
            songData = {
              album: result.item.album.name,
              artist: result.item.artists[0].name,
              title: result.item.name,
              progress: result.progress_ms,
              duration: result.item.duration_ms,
              isPlaying: true,
            };
          }
          // console.log("Response: " + JSON.stringify(res.data));
          dispatch(getCurrentSongSuccess(songData));
          return resolve();
        })
        .catch((err) => {
          // console.log("getCurrentSong failed: " + err.message);
          dispatch(getCurrentSongFailure({ song: { isPlaying: false } }));
          return resolve();
        });
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
