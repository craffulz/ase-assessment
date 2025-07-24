import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayers } from "../store/players.slice.js";
import { setSort } from "../store/players.slice.js";
import Pagination from "../components/Pagination.jsx";
import { setPlayerView } from "../store/playerView.slice.js";

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
      <th
        key={field}
        id="tableheader"
        onClick={() => handleSort(field)}
        className={`cursor-pointer  ${
          sortedBy === field ? "text-diale" : ""
        } px-4`}
      >
        {label}
        {directionSymbol}
      </th>
    );
  };
  const handleClick = (player) => {
    console.log(player);
    dispatch(setPlayerView(player));
  };

  return (
    <div className="flex flex-col w-full bg-secondary-900 p-2 h-[100vh] overflow-hidden">
      <div className="overflow-auto h-full  rounded-md bg-secondary-800">
        <table
          id="playersTable"
          className="min-w-full border-separate border-spacing-y-4 break-words"
        >
          <thead
            id="theader"
            className="h-12 sticky top-0 bg-secondary-900 border-spacing-x-12
         bg-secondary-00 text-neutral-100 font-bold 
          md:overflow-hidden"
          >
            <tr className="text-center ">
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
            </tr>
          </thead>
          <tbody
            id="tableContainer"
            className="

          bg-secondary-800 rounded-md border-secondary-800"
          >
            {players.map((player) => {
              return (
                <tr
                  onClick={() => handleClick(player)}
                  id="tablerow"
                  key={player.index}
                  className="
                h-12 text-center
                bg-secondary-700 text-neutral-100 transition-all transition-duration-300
                rounded-md cursor-pointer hover:bg-secondary-900 
                "
                >
                  <td>{player.name}</td>
                  <td>{player.position}</td>
                  <td>{player.team}</td>
                  <td>{player.appearances}</td>
                  <td>{player.goals}</td>
                  <td>{player.assists}</td>
                  <td>{player.height}</td>
                  <td>{player.weight}</td>
                  <td>{player.contract_end}</td>
                  <td>{player.contract_salary}</td>
                  <td>{player.market_value}</td>
                  <td>{player.nationality}</td>
                  <td>{player.age}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Pagination />
    </div>
  );
};

export default PlayersTable;
