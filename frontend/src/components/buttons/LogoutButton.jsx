import React from "react";
import { LogOut } from "lucide-react";
export const LogoutButton = () => {
  return (
    <LogOut
      color='#FFB22C'
      className="cursor-pointer hover:color-white hover:scale-105 transition-all transition-duration-300"
      width={40}
      height={40}
    />
  );
};
