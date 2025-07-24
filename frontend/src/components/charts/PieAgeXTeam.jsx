import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { User } from "lucide-react";

const PieAgeXTeam = ({ data }) => {
  
  const ages = [];
  const ageXteams = [...data];
  
  data.forEach((entry, index) => {
    const totalPlayers = data.reduce(
      (sum, { team, under21, between, over28 }) => {
        return entry.team === team ? sum + under21 + between + over28 : sum;
      },
      0
    );
    ageXteams[index].total = totalPlayers;
  });

  ageXteams.forEach(({ team, under21, between, over28, total }) => {
    ages.push({
      team: team,
      total: total,
      children: [
        { name: "Between", value: between },
        { name: "Over 28", value: over28 },
        { name: "Under21", value: under21 },
      ],
    });
  });

  

  const teamColors = ages.map((_, index) => {
    const hue = (index * 137.5) % 360;
    return `hsl(${hue}, 70%, 50%)`;
  });

  const colors = ["#075985", "#ef4444", "#10b981"];

  const customTooltip = ({ active, payload }) => {
    
    
    if (active && payload && payload.length) {
      if (payload[0].payload.team) {
       
        return (
          <div className="flex p-2 rounded-md items-center justify-center font-bold text-sm bg-white">
            {payload[0].payload.team}: {payload[0].payload.total}
            <User width={20} />
          </div>
        );
      }
      
      return (
        <div className="flex p-2 rounded-md items-center justify-center font-bold text-sm bg-white">
          {payload[0].name}: {payload[0].value}
          <User width={20} />
        </div>
      );
    }
  };

  return (
    <PieChart width={300} height={300} >
      <Tooltip content={customTooltip} />

      <Pie
        data={ages}
        dataKey="total"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        innerRadius={70}
        fill="#8884d8"
      >
        {ages.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={teamColors[index]} />
        ))}
      </Pie>

      <Pie
        data={ages.flatMap((team, teamIndex) =>
          team.children.map((child) => ({
            ...child,
            teamColor: teamColors[teamIndex],
          }))
        )}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={70}
        innerRadius={40}
        fill="#82ca9d"
      >
        {ages.flatMap((team, teamIndex) =>
          team.children.map((_, index) => (
            <Cell key={`subcell-${teamIndex}-${index}`} fill={colors[index]} />
          ))
        )}
      </Pie>
    </PieChart>
  );
};

export default PieAgeXTeam;
