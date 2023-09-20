import { userReducer } from "./reducer/user";
import { loadingReducer } from "./reducer/loading";
export const reducers = {
  auth: userReducer,
  loading: loadingReducer,
};
