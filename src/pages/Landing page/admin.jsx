import { useState } from "react";
import { NavTemplateAdmin } from "../../components/template/template";
const beHonest = require("../../assets/pictures/behonet-removebg-preview.png");
export const HomePageAdmin = () => {
  return (
    <>
      <NavTemplateAdmin>
        <div className="flex justify-center ">
          <img src={beHonest} alt="" className="object-cover" />
        </div>
      </NavTemplateAdmin>
    </>
  );
};
