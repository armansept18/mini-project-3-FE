import { Route, Routes } from "react-router-dom";
import "./App.css";
import { routes } from "./routes/routes";
import api from "./api/api";
import { useDispatch } from "react-redux";
import { types } from "./redux/types";
import { useEffect } from "react";
import { receiveUser } from "./middlewares/auth-middlewares";

function App() {
  const dispatch = useDispatch();

  async function dispatcher() {
    try {
      const token = localStorage.getItem("auth");
      dispatch(receiveUser());
      // console.log(token);

      // const res = await api.post("/users/token");
      // const user = res.data.user;
      // localStorage.setItem("auth", res.data.token);

      // dispatch({ type: types.login, payload: { ...user } });
    } catch (error) {
      // localStorage.removeItem("auth");
    }
  }

  useEffect(() => {
    dispatcher();
  }, []);

  return (
    <Routes>
      {routes.map((route, i) => (
        <Route {...route} key={i} />
      ))}
    </Routes>
  );
}

export default App;
