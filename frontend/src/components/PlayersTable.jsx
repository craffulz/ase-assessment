import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayers } from "../store/players.slice.js";
import { setSort } from "../store/players.slice.js";
import Pagination from "../components/Pagination.jsx";

const PlayersTable = () => {
  const dispatch = useDispatch();
  const [sortedBy, setSortedBy] = useState("name");

  const { accessToken } = useSelector((state) => state.user);
  const { players, loading, error, pagination, filters, sort } = useSelector(
    (state) => state.players
  );

  const currentPage = pagination.currentPage;
  const limit = 20;

  //console.log('[PlayersTable]', sort)

  useEffect(() => {
    if (accessToken) {
      //console.log("[PlayersTable] Accesstoken inside useEffect", accessToken);
      dispatch(
        fetchPlayers({
          accessToken: accessToken,
          page: currentPage,
          limit: limit,
          filters: filters,
          sort: sort,
        })
      );
    }
  }, [dispatch, accessToken, currentPage, filters, sort]);
  if (loading) return "Loading";
  if (error) return <div>Error: {error}</div>;
  if (!players.length) return <div>No players found</div>;

  const handleSort = (field) => {
    dispatch(setSort(field));
    setSortedBy(field);
  };

  const renderHeaders = (field, label) => {
    const isActive = sort.field === field;
    const directionSymbol = isActive
      ? sort.direction === "asc"
        ? "↑"
        : "↓"
      : "";
    return (
      <div
        id="tableheader"
        onClick={() => handleSort(field)}
        className={`flex  cursor-pointer ${
          sortedBy === field ? "text-diale" : ""
        } `}
      >
        {label}
        {directionSymbol}
      </div>
    );
  };

  return (
    <div
      id="playersTable"
      className="bg-secondary-600 flex flex-col grow items-center justify-center p-4 h-[100vh] overflow-hidden"
    >
      <div
        className="grid grid-cols-13 justify-center items-center p-8  w-full rounded-md mb-2
         bg-secondary-700 text-neutral-100 font-bold"
      >
        {renderHeaders("name", "Name")}
        {renderHeaders("position", "Position")}
        {renderHeaders("team", "Team")}
        {renderHeaders("appearances", "Appearances")}
        {renderHeaders("goals", "Goals")}
        {renderHeaders("assists", "Assists")}
        {renderHeaders("height", "Height (cm)")}
        {renderHeaders("weight", "Weight (kg)")}
        {renderHeaders("contract_end", "Contract End")}
        {renderHeaders("contract_salary", "Salary (€)")}
        {renderHeaders("market_value", "Market Value (€)")}
        {renderHeaders("nationality", "Nationality")}
        {renderHeaders("age", "Age")}
      </div>
      <div
        id="tableContainer"
        className="bg-secondary-800 rounded-md p-4 border-y-4 border-secondary-800 overflow-y-scroll"
      >
        <div id="tablebody" className="flex flex-col gap-4">
          {players.map((player) => {
            return (
              <div
                key={player.index}
                className="grid grid-cols-13 p-4 items-center justify-between w-full rounded-md cursor-pointer hover:bg-secondary-900
                bg-secondary-600  text-neutral-100 font-semibold transition-all transition-duration-300"
              >
                <div>{player.name}</div>
                <div>{player.position}</div>
                <div>{player.team}</div>
                <div>{player.appearances}</div>
                <div>{player.goals}</div>
                <div>{player.assists}</div>
                <div>{player.height}</div>
                <div>{player.weight}</div>
                <div>{player.contract_end}</div>
                <div>{player.contract_salary}</div>
                <div>{player.market_value}</div>
                <div>{player.nationality}</div>
                <div>{player.age}</div>
              </div>
            );
          })}
        </div>
      </div>

      <Pagination />
    </div>
  );
};

export default PlayersTable;
