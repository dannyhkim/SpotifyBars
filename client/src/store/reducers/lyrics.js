import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  lyrics: null,
  error: null,
}

const getLyricsStarted = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

const getLyricsSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    lyrics: action.lyrics
  };
};

const getLyricsFailure = (state, action) => {
  return {
    ...state,
    error: action.error
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LYRICS_STARTED: return getLyricsStarted(state, action);
    case actionTypes.GET_LYRICS_SUCCESS: return getLyricsSuccess(state, action);
    case actionTypes.GET_LYRICS_FAILURE: return getLyricsFailure(state, action);
    default: return state;
  };
};

export default reducer;
