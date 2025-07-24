import React from "react";
import { useSelector } from "react-redux";
import BarGoalsAssistsXPosi from "../charts/BarGoalsAssistsXPosi.jsx";
import PieAgeXTeam from "../charts/PieAgeXTeam.jsx";


const InteractivePanel = () => {

  const { players } = useSelector((state) => state.players);

  //get goals, assists per position
  const goalsAssistsXPosi = [];
  const positions = [...players].map(({ position }) => position);
  const positionsSet = new Set(positions);
  positionsSet.forEach((value) => {
    const goals = [...players].reduce(
      (sum, { position, goals }) => (position === value ? sum + goals : sum),
      0
    );
    const assists = [...players].reduce(
      (sum, { position, assists }) =>
        position === value ? sum + assists : sum,
      0
    );
    goalsAssistsXPosi.push({ position: value, goals: goals, assists: assists });
  });

  //get ages range per team: <21, 21>x<28, >28
  const ageXTeams = [];
  const teams = new Set([...players].map(({ team }) => team));

  teams.forEach((value) => {
    const under21 = [...players].filter(({ team, age }) => {
      if (team === value) return age <= 21;
    }).length;
    const between = [...players].filter(({ team, age }) => {
      if (team === value) return 21 > age <= 28;
    }).length;
    const over28 = [...players].filter(({ team, age }) => {
      if (team === value) return age > 28;
    }).length;

    ageXTeams.push({
      team: value,
      under21: under21,
      between: between,
      over28: over28,
    });
  });

  return (
    <div
      className="flex flex-col col-span-8 p-2 bg-secondary-700 rounded-md gap-2 
                        md:flex md:flex-row
                          xl:col-span-4"
    >
      <div className="flex flex-col flex-grow items-center justify-center bg-secondary-900 p-2 rounded-md ">
        <h2 className="text-center text-xl font-bold mb-2 text-neutral-100">
          Age demographics across teams
        </h2>
        <PieAgeXTeam data={ageXTeams} />
      </div>
      <div className="flex flex-col flex-grow items-center justify-center bg-secondary-900 p-2 rounded-md ">
        <h2 className="text-center text-xl font-bold text-neutral-100">
          Goals/assists distribution by position
        </h2>
        <BarGoalsAssistsXPosi data={goalsAssistsXPosi} />
      </div>
    </div>
  );
};

export default InteractivePanel;
