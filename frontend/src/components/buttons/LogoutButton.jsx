import React from "react";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { API_URL } from "../../config/config.js";

export const LogoutButton = ({ onClick, width, height }) => {
  const URL = API_URL
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const handleClick = async () => {
    try {
      const response = await fetch(`${URL}/api/auth/logout`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log(await response.json());
        throw new Error("No response");
      }

      navigateTo("/");
    } catch (error) {
      console.log("Error logging out", error);
    }
  };

  return (
    <LogOut
      onClick={() => {
        handleClick();
        dispatch(onClick());
      }}
      color="#FFB22C"
      className="cursor-pointer hover:color-white hover:scale-105 transition-all transition-duration-300"
      width={width}
      height={height}
    />
  );
};
