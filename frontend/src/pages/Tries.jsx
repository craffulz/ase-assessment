import React from "react";
import { useSelector } from "react-redux";
const Tries = () => {
  const { players, loading, error } = useSelector((state) => state.players);
  //Get teams
  //const playerDistribution = {};
  const teams = [...players].map(({ team }) => team);
  const positions = [...players].map(({ position }) => position);
  const teamsSet = new Set(teams);
  const positionsSet = new Set(positions);

  const playersPerTeams = [];
  teamsSet.forEach((value) => {
    const playersInTeam = [...players].filter(
      ({ team }) => team === value
    ).length;
    playersPerTeams.push({ name: value, value: playersInTeam });
  });

  const playersPerPosition = [];
  positionsSet.forEach((value) => {
    const playersInPosition = [...players].filter(
      ({ position }) => position === value
    );
    playersPerPosition.push({ name: value, value: playersInPosition });
  });

  console.log(playersPerTeams, playersPerPosition);

  if (loading) return <h2>Loading...</h2>;
  if (error) console.log("Error: ", error.message);

  return <div>Tries</div>;
};

export default Tries;
