import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getLyrics = () => {
  return (dispatch, getState) => {

    dispatch(getLyricsStarted());

    return new Promise((resolve, reject) => {
      const { currentSong } = getState().currentSong;

      axios.get(`/api/fetchLyrics?query=${currentSong}`)
        .then(res => {
          const lyrics = res.data;

          if (!lyrics) {
            throw new Error();
          }
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
