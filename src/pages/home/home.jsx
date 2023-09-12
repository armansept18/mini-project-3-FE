import { Button, Center } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const nav = useNavigate();
  const userSelector = useSelector((state) => state.auth);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    nav("/login");
  };

  const toCashier = () => {
    nav("/home/cashier");
  };

  useEffect(() => {
    console.log("user selector", userSelector);
  }, []);

  return (
    <>
      <Center
        style={{ display: "flex", flexDirection: "column", marginTop: "10rem" }}
      >
        <div>Home Page</div>
        <Button onClick={handleLogout} color={"red"}>
          LOGOUT
        </Button>
        <Button onClick={toCashier}>TO CASHIER PAGE</Button>
      </Center>
    </>
  );
};
