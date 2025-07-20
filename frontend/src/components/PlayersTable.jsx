import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayers } from "../store/players.slice.js";
import { setSort } from "../store/players.slice.js";
import Pagination from "../components/Pagination.jsx";

const PlayersTable = () => {
  console.log("[PlayersTable] RENDER...");
  const dispatch = useDispatch();

  const { accessToken } = useSelector((state) => state.user);
  const { players, loading, error, pagination, filters, sort } = useSelector(
    (state) => state.players
  );

  const currentPage = pagination.currentPage;
  const limit = 20;

  console.log("[PlayersTable] Access token from store...: \n", accessToken);
  console.log("[PlayersTable] Players from store... \n", players);

  useEffect(() => {
    if (accessToken) {
      console.log("Dentro del useEffect", accessToken);
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

  if (loading) return <div>Loading players...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!players.length) return <div>No players found</div>;

  const handleSort = (field) => {
    console.log("FIELD: ", field);
    dispatch(setSort(field));
  };

  //KHEE
  const renderHeaders = (field, label) => {
    const isActive = sort.field === field;
    const directionSymbol = isActive
      ? sort.direction === "asc"
        ? "↑"
        : "↓"
      : "";

    return (
      <th onClick={() => handleSort(field)} style={{ cursor: "pointer" }}>
        {label}
        {directionSymbol}
      </th>
    );
  };

  return (
    <div id="playersTable">
      <table className="table">
        <caption>Player Generic Data</caption>
        <thead>
          <tr>
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
        <tbody>
          {players.map((player, index) => {
            return (
              <tr key={index}>
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

      <Pagination />
    </div>
  );
};

export default PlayersTable;
