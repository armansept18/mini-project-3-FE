import { IoIosNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useState } from "react"; // Import useState
import { Avatar } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export const NavBar = ({ openSlide }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const nav = useNavigate();
  const userSelector = useSelector((state) => state.auth);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("auth");
    nav("/login");
  };

  return (
    <>
      <div className="max-md:hidden">
        <div>
          <nav class="bg-gray-100 dark:bg-gray-100 ">
            <div class="flex justify-between border-b-4 ">
              <div className="flex items-center p-4">
                {" "}
                <span className="hidden md:inline wi">ADMIN</span>
                <button
                  onClick={openSlide}
                  data-drawer-target="sidebar-multi-level-sidebar"
                  data-drawer-toggle="sidebar-multi-level-sidebar"
                  aria-controls="sidebar-multi-level-sidebar"
                  type="button"
                  class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                >
                  <span class="sr-only">Open sidebar</span>
                  <svg
                    class="w-6 h-6"
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
              </div>
              <div className="flex p-2">
                <div className="p-2 flex justify-between  ">
                  <div className="items-center flex justify-center">
                    <IoIosNotificationsOutline className="text-lg" />
                  </div>
                </div>
                <div className="p-2 flex justify-between ">
                  <div>ID | EN</div>
                </div>
                <div className="p-2 flex justify-between ">
                  <div className="flex">
                    <div className="items-center flex justify-center">
                      <Avatar className="text-sm" size={"sm"} />
                    </div>
                    <div className="w-2"></div>
                    <div>{userSelector.first_name}</div>
                  </div>
                </div>
                <div className="p-2 flex justify-between ">
                  <div>
                    <div onClick={toggleDropdown}>
                      <RiArrowDropDownLine className="text-2xl cursor-pointer" />
                    </div>
                    {isDropdownOpen && (
                      <div className="absolute top-12 right-0 bg-white border rounded-lg shadow-lg p-2">
                        <div onClick={handleLogout} className="cursor-pointer">
                          Logout
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};
