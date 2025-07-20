import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayers } from "../store/players.slice.js";

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
      dispatch(fetchPlayers(accessToken, currentPage, limit, filters, sort));
    }
  }, [dispatch, accessToken, currentPage, filters, sort]);

  if (loading) return <div>Loading players...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!players.length) return <div>No players found</div>;

  return (
    <table className="table">
      <caption>Player Generic Data</caption>
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Team</th>
          <th>Appearances</th>
          <th>Goals</th>
          <th>Assists</th>
          <th>Height (cm)</th>
          <th>Weight (kg)</th>
          <th>Contract End</th>
          <th>Salary (€)</th>
          <th>Market Value (€)</th>
          <th>Nationality</th>
          <th>Age</th>
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
  );
};

export default PlayersTable;
