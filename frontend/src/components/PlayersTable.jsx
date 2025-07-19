import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateToken } from "../store/user.slice.js";

const PlayersTable = () => {
  console.log("[PlayersTable] RENDER...");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { accessToken } = user;
  console.log("Wash hadshi ki tlogga????", accessToken);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/players", {
          credentials: "include",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log("Access token enviado: ", `Bearer ${accessToken}`);

        if (!response.ok) {
          console.log(await response.json());
          throw new Error();
        }

        const newAcc = response.headers.get("Authorization");

        if (newAcc) dispatch(updateToken(newAcc));

        console.log("q es esto", response.headers.get("Authorization"));
      } catch (error) {
        console.log("Error fetching players: ", error);
      }
    };

    fetchPlayers();
  });

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
