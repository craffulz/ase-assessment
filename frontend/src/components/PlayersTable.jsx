import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayers } from "../store/players.slice.js";

const PlayersTable = () => {
  console.log("[PlayersTable] RENDER...");
  const dispatch = useDispatch();

  const { accessToken } = useSelector((state) => state.user);
  const {  players, loading, error } = useSelector((state) => state.players);

  console.log("[PlayersTable] Access token from store...: \n", accessToken);
  console.log("[PlayersTable] Players from store... \n", players);

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchPlayers(accessToken));
    }
  }, [accessToken, dispatch]);

  if (loading) return <div>Loading players...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!players.length) return <div>No players found</div>;

  return (
    <table class="table">
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
        {players.map((player) => {
          console.log(player);
        })}
        <tr>
          <td>Alessandro Rodriguez</td>
          <td>Midfielder</td>
          <td>Real Madrid</td>
          <td>32</td>
          <td>7</td>
          <td>12</td>
          <td>175</td>
          <td>70</td>
          <td>2027-06-30</td>
          <td>180,000</td>
          <td>35,000,000</td>
          <td>Spain</td>
          <td>26</td>
        </tr>
        <tr>
          <td>Marcus Thompson</td>
          <td>Forward</td>
          <td>Manchester United</td>
          <td>28</td>
          <td>15</td>
          <td>5</td>
          <td>185</td>
          <td>78</td>
          <td>2025-12-15</td>
          <td>250,000</td>
          <td>50,000,000</td>
          <td>England</td>
          <td>28</td>
        </tr>
        <tr>
          <td>Lucas Silva</td>
          <td>Winger</td>
          <td>Bayern Munich</td>
          <td>25</td>
          <td>10</td>
          <td>8</td>
          <td>180</td>
          <td>75</td>
          <td>2026-05-20</td>
          <td>200,000</td>
          <td>42,000,000</td>
          <td>Brazil</td>
          <td>24</td>
        </tr>
      </tbody>
    </table>
  );
};

export default PlayersTable;
