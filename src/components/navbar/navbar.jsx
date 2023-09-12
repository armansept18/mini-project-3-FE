import { IoIosNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { RiArrowDropDownLine } from "react-icons/ri";
export const NavBar = () => {
  return (
    <>
      <div>
        <div>
          <nav class="bg-gray-100 dark:bg-gray-100 ">
            <div class="flex justify-between border-b-4 ">
              <div></div>
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
                      <CgProfile className="text-lg" />
                    </div>
                    <div className="w-2"></div>
                    <div>Andre</div>
                  </div>
                </div>
                <div className="p-2 flex justify-between ">
                  <div>
                    <div>
                      <RiArrowDropDownLine className="text-2xl" />
                    </div>
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
