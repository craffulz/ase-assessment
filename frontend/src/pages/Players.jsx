import PlayersTable from "../components/PlayersTable.jsx";
import Sidebar from "../components/Sidebar.jsx";
const Players = () => {
  return (
    <div className="flex flex-row bg-[slate-700] w-[100vw]">
      <Sidebar />
      <PlayersTable />
    </div>
  );
};

export default Players;
