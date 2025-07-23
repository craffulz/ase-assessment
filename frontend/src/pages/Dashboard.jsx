//import ResumeCard from "../components/ResumeCard.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayers } from "../store/players.slice.js";
import { fetchAttributes } from "../store/playersAttributes.slice.js";
import MarketInsights from "../components/MarketInsights.jsx";
import PlayersFilters from "../components/PlayersFilters.jsx";
import ResumeCard from "../components/ResumeCard.jsx";
import LineMarketXHistory from "../components/charts/LineMarketXHistory.jsx";
import RadarPlayersAtt from "../components/charts/RadarPlayersAtt.jsx";
import BarGoalsAssistsXPosi from "../components/charts/BarGoalsAssistsXPosi.jsx";
import InteractivePanel from "../components/InteractivePanel.jsx";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.user);
  const { players, filters, sort } = useSelector((state) => state.players);

  useEffect(() => {
    dispatch(
      fetchPlayers({
        accessToken: accessToken,
        limit: null,
        filters: filters,
        sort: sort,
      })
    );

    dispatch(fetchAttributes({ accessToken: accessToken }));
  }, [accessToken, dispatch, filters, sort]);
  //todos los componentes de aqui abajo actuaran bajo los mismo filtros
  return (
    <div id="dashboard" className="flex flex-col w-full bg-primary-100 p-4 gap-4">
      <PlayersFilters />
      <ResumeCard data={players} />
      <MarketInsights />
      <InteractivePanel />
      <LineMarketXHistory />
      <RadarPlayersAtt />
    </div>
  );
};

export default Dashboard;
