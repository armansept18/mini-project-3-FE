import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ProtectedPage = ({ children, needLogin = false }) => {
  const userSelector = useSelector((state) => state.auth);
  const nav = useNavigate();

  useEffect(() => {
    if (needLogin && userSelector.role_id == 2) {
      return nav("/cashier");
    } else if (needLogin && userSelector.role_id === 1) {
      return;
    }
  }, [children]);

  return children;
};
