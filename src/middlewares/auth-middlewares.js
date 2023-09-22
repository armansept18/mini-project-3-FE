import { async } from "q";
import api from "../api/api";
import { types } from "../redux/types";
import jwt_decode from "jwt-decode";

export const receiveUser = () => {
  return async (dispatch) => {
    try {
      const { id } = jwt_decode(localStorage.getItem("auth"));
      const res = await api.get(`users/${id}`);

      const user = res.data;

      dispatch({
        type: types.login,
        payload: user,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const userLogin = (values) => {
  return async (dispatch) => {
    try {
      const res = await api.post("users/auth", {
        ...values,
      });

      const user = res.data.user;
      localStorage.setItem("auth", res.data.token);

      dispatch({
        type: types.login,
        payload: user,
      });

      return { success: true, user };
    } catch (error) {
      localStorage.removeItem("auth");
      return { success: false, error: error.message };
    }
  };
};

