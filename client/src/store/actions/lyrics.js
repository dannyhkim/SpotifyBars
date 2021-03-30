import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getLyrics = () => {
  return (dispatch, getState) => {

    dispatch(getLyricsStarted());

    return new Promise((resolve, reject) => {
      // grab current song from redux state using getState
      const currentSong = getState().song.currentSong;
      const artist = currentSong.artist;
      const title = currentSong.title;
      console.log("artist " + artist);
      console.log("title " + title);

      axios.get(`/api/fetchLyrics?artist="${artist}"&title="${title}"`)
        .then(res => {
          const lyrics = res.data;

          if (!lyrics) {
            throw new Error();
          }
          console.log("Lyrics: " + lyrics);
          dispatch(getLyricsSuccess(lyrics));

          return resolve();
        })
        .catch(err => {
          dispatch(getLyricsFailure(null));
          reject(err);
        })
    })
  }
}

const getLyricsStarted = () => {
  return {
    type: actionTypes.GET_LYRICS_STARTED,
  };
};

const getLyricsSuccess = (currentSong) => {
  return {
    type: actionTypes.GET_LYRICS_SUCCESS,
    currentSong: currentSong,
  };
};

const getLyricsFailure = (error) => {
  return {
    type: actionTypes.GET_LYRICS_FAILURE,
    error: error,
  };
};
