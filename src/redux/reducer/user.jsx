import { types } from "../types";

const init_state = {
  username: "",
  email: "",
  password: "",
  role: "",
};

export const userReducer = (state = init_state, action) => {
  if (action.types === types.login) {
    return {
      ...state,
      id: action.payload.id,
      username: action.payload.username,
      email: action.payload.email,
      password: action.payload.password,
      role: action.payload.role,
    };
  } else if (action.types === types.logout) {
    return init_state;
  }
  return state;
};
