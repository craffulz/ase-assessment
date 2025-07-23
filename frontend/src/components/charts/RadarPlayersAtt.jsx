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

  const generateColorPalette = (count) => {
    const colors = [];
    const goldenRatio = 0.618033988749895; // Ángulo áureo para distribución óptima

    for (let i = 0; i < count; i++) {
      const hue = (i * goldenRatio * 360) % 360;
      const saturation = 70 + (i % 15); // Varía entre 70-85%
      const lightness = 50 + (i % 11); // Varía entre 50-60%

      colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    }

    return colors;
  };

  const playerColors = generateColorPalette(playerMatched.length);

  return (
    <RadarChart outerRadius={90} width={730} height={250} data={radarData}>
      {radarData.map((player, index) => {
        return (
          <Radar
            key={index}
            name={`${playerMatched[index].name}`}
            dataKey={`${Object.keys(player)[index]}`}
            stroke={playerColors[index]}
            fill={playerColors[index]}
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
