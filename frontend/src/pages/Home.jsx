import Sidebar from "../components/Sidebar.jsx";
import Dashboard from "../components/dashboard/Dashboard.jsx";

const Home = () => {
  return (
    <div className="flex flex-row bg-slate-700 w-[100vw]">
      <Sidebar />
      <Dashboard />
    </div>
  );
};

export default Home;
