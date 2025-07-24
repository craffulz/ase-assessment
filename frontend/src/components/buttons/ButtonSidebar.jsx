import React from "react";
import { Link } from "react-router";

const ButtonSidebar = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="flex w-full h-14 p-5 items-center gap-3 rounded-md cursor-pointer font-semibold text-xl
       bg-gray-700 shadow-xl  backdrop-blur-2xl
        hover:bg-gray-600 hover:text-[#FFB22C] transition-all transition-duration-600"
    >
      {children}
    </Link>
  );
};

export default ButtonSidebar;
