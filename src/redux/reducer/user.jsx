import { types } from "../types";

const init_state = {
  id: 0,
  first_name: "",
  email: "",
  role_id: 0,
};

export const userReducer = (state = init_state, action) => {
  if (action.type === types.login) {
    return {
      ...state,
      ...action.payload,
    };
  } else if (action.type === types.logout) {
    return init_state;
  }
  return state;
};
