import React from "react";
import { useSelector } from "react-redux";
import ChartPie from "../charts/PiePlayerTeam.jsx";
import PiePlayerTeam from "../charts/PiePlayerTeam.jsx";
import PiePlayerPosition from "../charts/PiePlayerPosition.jsx";

const MarketInsights = () => {
  const { players, loading, error } = useSelector((state) => state.players);

  //Get most valuable players => where market_value not null and sort (a, b)(b-a)
  const topValuables = [...players]
    .filter(({ market_value }) => market_value !== null)
    .sort((a, b) => b.market_value - a.market_value)
    .slice(0, 3);
  //Get players with close contract end, calculate today date and in 6 months?
  const today = new Date();
  const in6months = new Date();
  in6months.setMonth(today.getMonth() + 6);

  // const closeEndContract = [...players].filter(({ contract_end }) => {
  //   const contractEnd = new Date(contract_end);
  //   return contractEnd <= in6months && contractEnd >= today;
  // });

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
    ).length;
    playersPerPosition.push({ name: value, value: playersInPosition });
  });

  if (loading) return <h2>Loading...</h2>;
  if (error) console.log("Error: ", error.message);

  return (
    <div id="market-insights" className="col-span-8 grid grid-cols-8 rounded-md gap-3 text-neutral-100 bg-secondary-700">

      <div
        id="table"
        className="col-span-8 flex flex-col justify-between shadow-md rounded-md text-sm p-2 bg-secondary-900
                    sm:col-span-4
                      md:col-span-2
                        xl:col-span-1"
      >

        <h2 className="text-xl font-bold text-center ">Most valuable players</h2>
        {topValuables.map(({ market_value, name }, index) => {
          return (
            <div
              key={index}
              id="most-valuable"
              className="flex flex-row justify-between gap-3 m-2 min-h-8 cursor-pointer rounded-md p-2
               bg-secondary-700 hover:bg-secondary-800
               font-bold text-sm"
            >
              <p>{name}</p> <p>{market_value}$</p>
            </div>
          );
        })}
      </div>
      {/* <div className="bg-primary-200 p-2 rounded-md shadow-md">
        <h2 className="text-center text-xl font-bold">
          Contract end &lt;6months
        </h2>
        {closeEndContract.map(({ contract_end, name }, index) => {
          return (
            <div
              key={index}
              id="most-valuable"
              className="flex flex-row justify-between gap-3 m-2 min-h-8 cursor-pointer rounded-md p-2
               bg-secondary-700 hover:bg-secondary-800 font-bold text-sm"
            >
              <p>{name}</p> <p>{contract_end}</p>
            </div>
          );
        })}
      </div>
      <div className="flex flex-row col-span-2 p-2">
        <div className="flex flex-col flex-grow items-center justify-center">
          <h2 className="text-center text-xl font-bold">Players/Position</h2>
          <PiePlayerPosition data={playersPerPosition} />
        </div>
        <div className="flex flex-col flex-grow items-center justify-center">
          <h2 className="text-center text-xl font-bold">Players/Team</h2>
          <PiePlayerTeam data={playersPerTeams} />
        </div>
      </div> */}
    </div>
  );
};

export default MarketInsights;
