import { Route, Routes } from "react-router-dom";
import "./App.css";
import { routes } from "./routes/routes";

function App() {
  return (
    <Routes>
      {routes.map((route, i) => (
        <Route {...route} key={i} />
      ))}
    </Routes>
  );
}

export default App;
