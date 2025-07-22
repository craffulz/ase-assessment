import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchPlayers } from "../store/players.slice.js";
import PiePlayerTeam from "../components/charts/PiePlayerTeam.jsx";
import PiePlayerPosition from "../components/charts/PiePlayerPosition.jsx";
const Tries = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.user);
  const { players, filters, sort, loading, error } = useSelector(
    (state) => state.players
  );

  useEffect(() => {
    dispatch(
      fetchPlayers({
        accessToken: accessToken,
        limit: null,
        filters: filters,
        sort: sort,
      })
    );
  }, [accessToken, dispatch, filters, sort]);

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
    ).length;
    playersPerPosition.push({ name: value, value: playersInPosition });
  });

  console.log(playersPerTeams, playersPerPosition);

  if (loading) return <h2>Loading...</h2>;
  if (error) console.log("Error: ", error.message);

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col justfiy-center items-center">
      <PiePlayerTeam data={playersPerTeams} />
      <PiePlayerPosition data={playersPerPosition} />
    </div>
  );
};

export default Tries;
