import React, { useEffect } from "react";

const PlayersTable = () => {
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/players", {
          credentials: "include",
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error();

        const players = await response.json();

        console.log(players);
      } catch (error) {
        console.log("Error fetching players: ", error);
      }
    };

    fetchPlayers();
  });

  return <div>PlayersTable</div>;
};

export default PlayersTable;
