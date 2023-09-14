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
import { PiHamburgerBold, PiCoffeeBold } from "react-icons/pi";
import { GiManualJuicer } from "react-icons/gi";
import { FaBowlFood } from "react-icons/fa6";

export const SideBarCashier = ({ isSlideOpen }) => {
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
      <nav className="max-md:w-full max-md:top-0 max-md:fixed dark:bg-gray-900 md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative  md:w-52 z-10 ">
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
            CASHIER
          </span>
          <hr className="my-4 md:min-w-full  border-b-4 mt-5" />
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
                <div className="flex justify-between border-b-4 "></div>
              </div>
            </div>
            {/* Navigation :)*/}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li
                onClick={() => nav("/coffee")}
                className="cursor-pointer mb-4"
              >
                <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <PiCoffeeBold className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ml-3 whitespace-nowrap">COFFEE</span>
                </a>
              </li>

              <li
                onClick={() => nav("/noncoffee")}
                className="cursor-pointer mb-4"
              >
                <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <GiManualJuicer className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    NON COFFEE
                  </span>
                </a>
              </li>

              <li onClick={() => nav("/food")} className="cursor-pointer mb-4">
                <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <FaBowlFood className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ml-3 whitespace-nowrap">FOOD</span>
                </a>
              </li>

              <li onClick={() => nav("/snack")} className="cursor-pointer mb-4">
                <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <PiHamburgerBold className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ml-3 whitespace-nowrap">SNACK</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
