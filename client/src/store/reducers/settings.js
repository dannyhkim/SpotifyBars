import * as actionTypes from "../actions/actionTypes";

const initialState = {
  settings: {
    autoRefresh: true,
    autoScrollLyrics: true,
  },
};

const toggleSettings = (state, action) => {
  return {
    ...state,
    [action.key]: !state.settings[action.key],
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_SETTINGS: return toggleSettings(state, action);
    default: return state;
  }
};

export default reducer;
