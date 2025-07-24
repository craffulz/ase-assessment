//import ResumeCard from "../components/ResumeCard.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayers } from "../../store/players.slice.js";
import { fetchAttributes } from "../../store/playersAttributes.slice.js";
import MarketInsights from "./MarketInsights.jsx";
//import PlayersFilters from "../PlayersFilters.jsx";
import ResumeCard from "./ResumeCard.jsx";
import LineMarketXHistory from "../charts/LineMarketXHistory.jsx";
import RadarPlayersAtt from "../charts/RadarPlayersAtt.jsx";
import InteractivePanel from "./InteractivePanel.jsx";

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
    <div
      id="dashboard"
      className="grid grid-cols-8 w-full bg-secondary-900 p-4 gap-4  h-[100vh]  overflow-y-scroll"
    >
      {/*<PlayersFilters />*/}
      <ResumeCard data={players} />
      <MarketInsights />
      {/* <InteractivePanel />
      <LineMarketXHistory />
      <RadarPlayersAtt /> */}
    </div>
  );
};

export default Dashboard;
