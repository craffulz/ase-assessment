import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { useLocation } from "react-router";

const ButtonSidebar = ({ to, children }) => {
  const [isActive, setActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === to) setActive(true);
  }, []);

  console.log(location);
  return (
    <Link
      to={to}
      className={`flex w-full h-14 p-5 items-center gap-3 rounded-md cursor-pointer font-semibold text-xl
       bg-gray-700 shadow-xl  backdrop-blur-2xl
        hover:bg-gray-600 hover:text-[#FFB22C] transition-all transition-duration-600 ${
          isActive ? "text-[#FFB22C] " : ""
        }`}
    >
      {children}
    </Link>
  );
};

export default ButtonSidebar;
