//import ResumeCard from "../components/ResumeCard.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayers } from "../store/players.slice.js";
import MarketInsights from "../components/MarketInsights.jsx";
import PlayersFilters from "../components/PlayersFilters.jsx";
import ResumeCard from "../components/ResumeCard.jsx";
import InteractivePanel from "../components/InteractivePanel.jsx";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.user);
  const { filters, sort } = useSelector((state) => state.players);

  useEffect(() => {
    dispatch(
      fetchPlayers({
        accessToken: accessToken,
        limit: null,
        filters: filters,
        sort: sort,
      })
    );
  }, [accessToken, dispatch, filters, sort]);
  //todos los componentes de aqui abajo actuaran bajo los mismo filtros
  return (
    <div className="flex flex-col bg-primary-100 p-4 gap-4">
      <PlayersFilters />
      <ResumeCard/>
      <MarketInsights />
      <InteractivePanel/>
    </div>
  );
};

export default Dashboard;
