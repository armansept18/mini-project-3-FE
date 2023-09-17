import { useEffect, useState } from "react";
import { BiSolidBook } from "react-icons/bi";
import { MdProductionQuantityLimits } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@chakra-ui/react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";

export const SideBarAdmin = ({ isSlideOpen }) => {
  // console.log(isSlideOpen);
  const nav = useNavigate();
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("auth");
    nav("/login");
  };

  const sideBarStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 40,
    width: "64px", // Sesuaikan lebar slide bar sesuai kebutuhan Anda
    height: "100%",
    transition: "transform 0.3s",
    transform: isSlideOpen ? "translateX(-100%)" : "translateX(0)",
  };

  return (
    <>
      <nav className="max-md:w-full max-md:top-0 max-md:fixed dark:bg-gray-900 md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 ">
        <div className=" md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="left-0 cursor-pointer text-black md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <svg
              className="w-6 h-6 cursor-pointer max-md:text-white"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
          <span className="max-md:hidden dark:text-white text-center md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
            ADMIN
          </span>
          <hr className="my-4 md:min-w-full  border-b-4 mt-5 bg-black" />
          <div
            className=" max-md:text-white md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            to="/"
          >
            <div className="flex p-2 md:hidden">
              <div className="p-2 flex justify-between  ">
                <div className="items-center flex justify-center">
                  <IoIosNotificationsOutline className="text-lg" />
                </div>
              </div>

              <div className="p-2 flex justify-between items-center ">
                <div>ID | EN</div>
              </div>
              <div className="p-2 flex justify-between items-center  ">
                <div className="flex items-center ">
                  <div className="items-center flex justify-center  ">
                    <Avatar className="text-sm" size={"sm"} />
                  </div>
                  <div className="w-2"></div>
                  <div>Andre</div>
                </div>
              </div>
              <div className="p-2 flex justify-between items-center ">
                <div>
                  <div onClick={toggleDropdown}>
                    <RiArrowDropDownLine className="text-2xl cursor-pointer" />
                  </div>
                  {isDropdownOpen && (
                    <div className="absolute top-12 right-0 bg-white border rounded-lg shadow-lg p-2">
                      <div
                        onClick={handleLogout}
                        className="cursor-pointer cursor-pointer text-gray-900"
                      >
                        Logout
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Collapse */}
          <div
            className={
              "max-md:mt-7 max-md:bg-gray-900 md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className=" md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <BsFillArrowLeftSquareFill
                  className="text-2xl text-white"
                  onClick={() => setCollapseShow("hidden")}
                />
                <div className="flex justify-between border-b-4 ">
                  {" "}
                  {/* <span className="hidden md:inline wi text-white">
                      ADMIN
                    </span> */}
                </div>
              </div>
            </div>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li
                onClick={() => nav("/dashboard")}
                className="cursor-pointer mb-4"
              >
                <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Dashboard
                  </span>
                </a>
              </li>

              <li
                onClick={() => nav("/report")}
                className="cursor-pointer mb-4"
              >
                <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <TbReportAnalytics className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ml-3 whitespace-nowrap">Report</span>
                </a>
              </li>

              <li
                onClick={() => nav("/product")}
                className="cursor-pointer mb-4"
              >
                <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <MdProductionQuantityLimits className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ml-3 whitespace-nowrap">Product</span>
                </a>
              </li>

              <li className="mb-4" onClick={() => nav("/employee")}>
                <a className="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Employee
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
