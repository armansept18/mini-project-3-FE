import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ProtectedPage = ({ children, needLogin = false }) => {
  const userSelector = useSelector((state) => state.auth);
  const nav = useNavigate();
  console.log("children", children);
  console.log("user selector", userSelector);

  useEffect(() => {
    if (needLogin && userSelector.role_id !== 1) {
      return nav("/home/cashier");
    } else if (needLogin && userSelector.role_id === 1) {
      return;
    }
  }, [children]);

  return children;
};
