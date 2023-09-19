import { types } from "../types";

const initialState = {
  isLoading: false,
};

export const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case action.type === types.start_loading:
      return {
        ...state,
        isLoading: true,
      };
    case action.type === types.stop_loading:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
