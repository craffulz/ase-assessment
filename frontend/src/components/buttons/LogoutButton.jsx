import React from "react";
import { LogOut } from "lucide-react";
export const LogoutButton = ({width, height}) => {
  return (
    <LogOut
      color='#FFB22C'
      className="cursor-pointer hover:color-white hover:scale-105 transition-all transition-duration-300"
      width={width}
      height={height}
    />
  );
};
