import { types } from "../redux/types";

export const startLoading = () => {
  return (dispatch) => {
    dispatch({ type: types.start_loading });
  };
};

export const stopLoading = () => {
  return (dispatch) => {
    dispatch({ type: types.stop_loading });
  };
};
