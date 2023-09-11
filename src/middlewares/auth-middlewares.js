import api from "../api/api";
import { types } from "../redux/types";

export const userLogin = (values) => {
  return async (dispatch) => {
    try {
      const res = await api.post("users/auth", {
        ...values,
      });

      const user = res.data;

      dispatch({
        type: types.login,
        payload: user,
      });

      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
};
