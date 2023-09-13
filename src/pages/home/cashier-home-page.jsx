import { Button, Center } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const CashierHomePage = () => {
  const nav = useNavigate();
  const userSelector = useSelector((state) => state.auth);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    nav("/login");
  };

  const toAdmin = () => {
    nav("/home/admin");
  };

  return (
    <>
      <Center display={"flex"} flexDir={"column"} mt={"15rem"}>
        <h1>INI CASHIER LANDING PAGE</h1>
        hi {userSelector.first_name} as{" "}
        {userSelector.role_id == 1 ? "admin" : "cashier"}
        <Button onClick={handleLogout} color={"red"}>
          LOGOUT
        </Button>
        <Button onClick={toAdmin}>TO ADMIN PAGE</Button>
      </Center>
    </>
  );
};
