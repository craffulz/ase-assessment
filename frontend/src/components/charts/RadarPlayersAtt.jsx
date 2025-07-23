import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";

import { useSelector } from "react-redux";

const RadarPlayersAtt = () => {
  const { playersAttributes } = useSelector((state) => state.playersAttributes);
  const { players } = useSelector((state) => state.players);

  console.log(playersAttributes, players);

  const matched = [];
  const playerMatched = [];
  players.forEach((player) => {
    const playerAttrs = playersAttributes.filter(
      (attr) => attr.player_id === player.id
    );

    if (playerAttrs.length > 0) {
      matched.push(...playerAttrs);
      playerMatched.push(player);
    }
  });
  console.log("wa dryem", matched, playerMatched);

  if (!matched || matched.length === 0) {
    return <div>No player data available</div>;
  }
  const attributes = Object.keys(matched[0]).filter(
    (key) => key !== "player_id"
  );
  const radarData = [];
  for (const attr of attributes) {
    const dataPoint = {
      attribute: attr.charAt(0).toUpperCase() + attr.slice(1),
      fullMark: 100,
    };
    for (const player of matched) {
      dataPoint[`player_${player.player_id}`] = player[attr];
    }
    radarData.push(dataPoint);
  }

  

  return (
    <RadarChart outerRadius={90} width={730} height={250} data={radarData}>
      {radarData.map((player, index) => {
        console.log("khee", player);
        return (
          <Radar
            key={index}
            name={`${playerMatched[index].name}`}
            dataKey={`${Object.keys(player)[index]}`}
            stroke="#38bdf8"
            fill="#7dd3fc"
            fillOpacity={0.6}
          />
        );
      })}
      <PolarGrid />
      <Legend />
      <PolarAngleAxis dataKey="attribute" />
      <PolarRadiusAxis angle={30} domain={[0, 100]} />
    </RadarChart>
  );
};

export default RadarPlayersAtt;
