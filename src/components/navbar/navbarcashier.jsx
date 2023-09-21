import { IoIosNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useEffect, useState } from "react"; // Import useState
import { Avatar } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import api from "../../api/api";
import { useDebounce } from "use-debounce";

export const NavBarCashier = ({ openSlide, fetchSearch }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const nav = useNavigate();
  const userSelector = useSelector((state) => state.auth);
  //search
  const [search, setSearch] = useState("");

  const [debouncedSearch] = useDebounce(search, 1000);

  useEffect(() => {
    fetchSearch(debouncedSearch);
  }, [debouncedSearch]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("auth");
    nav("/login");
  };

  return (
    <>
      <div className="max-xl:mt-20 max-xl:h-2 max-xl:w-0">
        <div>
          <nav class="bg-gray-100 dark:bg-gray-100 ">
            <div class="flex justify-between border-b-4 ">
              <div className="flex items-center max-xl:mt-2">
                {/* search input */}
                <div class=" w-full xl:ml-60 max-xl:mt-24 max-xl:w-56 max-xl:absolute ">
                  <input
                    type="text"
                    id="simple-search"
                    className=" max-xl:mt-28 max-xl:relative bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 p-2.5  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search product..."
                    required
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <button
                  className="max-xl:ml-60 max-xl:absolute max-xl:mt-52 p-2.5 ml-2 text-sm font-thin text-white bg-blue-300 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={fetchSearch}
                >
                  <svg
                    class="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span class="sr-only">Search</span>
                </button>
              </div>
              <div className="flex p-2 max-xl:hidden">
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
