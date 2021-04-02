import * as actionTypes from "./actionTypes";

export const toggleSettings = (key) => {
  return {
    type: actionTypes.TOGGLE_SETTINGS,
    key: key
  }
};
