import { useState } from "react"
import logo from "../../assets/image/logo.png"
import { useNavigate } from "react-router-dom";
import { NavBar } from "../navbar/Navbar";

export const Header = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home");
  };

  return (
    <div className="text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="bg-[#ffcde0] h-28 flex items-center justify-between py-4">
        <div className="rounded-full overflow-hidden w-[6rem] h-[6rem] ml-8">
          <img
            src={logo}
            alt="logo"
            className="w-full h-full object-cover cursor-pointer"
            onClick={goHome}
          />
        </div>
        <NavBar />
      </div>
    </div>
  );
};
