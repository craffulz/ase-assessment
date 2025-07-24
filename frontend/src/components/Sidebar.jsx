import ButtonSidebar from "./buttons/ButtonSidebar.jsx";
import { UserRoundPlus } from "lucide-react";
import { ClipboardPlus } from "lucide-react";
import { ChartColumn } from "lucide-react";
import { Users } from "lucide-react";
import { Table2 } from "lucide-react";
import ProfileButton from "./buttons/ProfileButton.jsx";
import { LogoutButton } from "./buttons/LogoutButton.jsx";
const Sidebar = () => {
  return (
    <div className="flex flex-col gap-4 items-center w-[275px] box-border text-neutral-100 h-[100vh] p-4 bg-secondary-800">
      <div id="logo" className="font-bold text-4xl">
        ASE Football Metrica
      </div>
      <div className="h-1 w-full bg-diale"></div>

      <ButtonSidebar to="/">
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
      <ButtonSidebar to="/newPlayer">
        <UserRoundPlus />
        Add Player
      </ButtonSidebar>
      <ButtonSidebar to="/newReport">
        <ClipboardPlus />
        Add Report
      </ButtonSidebar>

      <div className="flex flex-row gap-12 grow items-end">
        <ProfileButton />
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;
