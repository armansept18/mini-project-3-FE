import { useState } from "react";
import { NavTemplateAdmin } from "../../components/template/template";
const beHonest = require("../../assets/pictures/behonet-removebg-preview.png");
const workSpirit = require("../../assets/pictures/semangat-removebg-preview.png");
export const HomePageAdmin = () => {
  return (
    <>
      <NavTemplateAdmin>
        <div className="flex justify-center max-sm:mt-20">
          <div className="col-auto items-center">
            <img src={workSpirit} alt="" className="object-cover " />
            <img src={beHonest} alt="" className="object-cover " />
          </div>
        </div>
      </NavTemplateAdmin>
    </>
  );
};
