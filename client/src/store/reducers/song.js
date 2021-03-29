import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  currentSong: null,
  error: null,
}

const getCurrentSongStarted = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

const getCurrentSongSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    currentSong: action.currentSong
  };
};

const getCurrentSongFailure = (state, action) => {
  return {
    ...state,
    error: action.error
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CURRENT_SONG_STARTED: return getCurrentSongStarted(state, action);
    case actionTypes.GET_CURRENT_SONG_SUCCESS: return getCurrentSongSuccess(state, action);
    case actionTypes.GET_CURRENT_SONG_FAILURE: return getCurrentSongFailure(state, action);
    default: return state;
  };
};

export default reducer;
