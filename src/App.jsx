import { Route, Routes } from "react-router-dom";
import "./App.css";
import { routes } from "./routes/routes";
import api from "./api/api";
import { useDispatch } from "react-redux";
import { types } from "./redux/types";
import { useEffect, useState } from "react";
import { receiveUser } from "./middlewares/auth-middlewares";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

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
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return isLoading ? (
    <></>
  ) : (
    <Routes>
      {routes.map((route, i) => (
        <Route {...route} key={i} />
      ))}
    </Routes>
  );
}

export default App;
