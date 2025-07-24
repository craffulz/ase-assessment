import { useState } from "react";
import ButtonSidebar from "./buttons/ButtonSidebar.jsx";
import { UserRoundPlus } from "lucide-react";
import { ClipboardPlus } from "lucide-react";
import { ChartColumn } from "lucide-react";
import { Users } from "lucide-react";
import { Table2 } from "lucide-react";
import ProfileButton from "./buttons/ProfileButton.jsx";
import { LogoutButton } from "./buttons/LogoutButton.jsx";
import { Menu } from "lucide-react";

import { logout } from "../store/user.slice.js";

import { setPlayerForm, setReportForm } from "./../store/playerView.slice.js";

const Sidebar = () => {
  const [sidebarActive, setSidebar] = useState(false);
  return (
    <div className="flex flex-row">
      <div
        id="mobileSideBar"
        className="flex flex-col  sm:hidden p-2 bg-secondary-800 text-neutral-100"
      >
        <Menu
          onClick={() => setSidebar((prev) => !prev)}
          color="#FFB22C"
          width={30}
          height={30}
          className="cursor-pointer"
        />

        <div className="flex flex-col gap-4 grow justify-end">
          <ProfileButton width={30} height={30} />
          <LogoutButton width={30} height={30} />
        </div>
      </div>
      <div
        className={` ${
          sidebarActive ? "flex flex-col" : "hidden"
        } transition-opacity transition-duration-300
                     gap-4 items-center w-[300px] box-border text-neutral-100 h-[100vh] p-4 bg-secondary-800
                      sm:w-[275px] sm:flex sm:flex-col 
    `}
      >
        <div id="logo" className="font-bold text-4xl">
          ASE Football Metrica
        </div>
        <div className="h-1 w-full bg-diale"></div>

        <ButtonSidebar to="/home">
          <ChartColumn />
          Dashboard
        </ButtonSidebar>
        <ButtonSidebar to="/players">
          <Table2 />
          Players
        </ButtonSidebar>
        <ButtonSidebar to="/">
          <Users />
          Matchup
        </ButtonSidebar>
        <ButtonSidebar onClick={setPlayerForm}>
          <UserRoundPlus />
          Add Player
        </ButtonSidebar>
        <ButtonSidebar onClick={() => setReportForm()}>
          <ClipboardPlus />
          Add Report
        </ButtonSidebar>

        <div className="hidden sm:flex sm:flex-row gap-12 grow items-end">
          <ProfileButton width={40} height={40} />
          <LogoutButton onClick={() => logout()} width={40} height={40} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
