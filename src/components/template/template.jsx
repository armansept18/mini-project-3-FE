import { NavBar } from "../navbar/navbar";
import { SlideBar } from "../slidebar/slidebar";

export const NavTemplate = ({ children }) => {
  return (
    <>
      <NavBar />
      <div>
        <div>{children}</div>
      </div>
      <SlideBar />
    </>
  );
};
