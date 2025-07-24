import React from "react";
import { CircleUser } from "lucide-react";
const ProfileButton = ({width, height}) => {
  return <CircleUser  className="cursor-pointer hover:scale-105 transition-all transition-duration-300" height={height} width={width} />;
};

export default ProfileButton;
