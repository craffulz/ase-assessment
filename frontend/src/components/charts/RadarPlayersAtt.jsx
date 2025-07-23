import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RadarPlayersAtt = () => {
  const { playersAttributes } = useSelector((state) => state.playersAttributes);
  const [parsedData, setParsed] = useState([]);
  console.log(playersAttributes);
  /**
   * Get data for radar chart: 
   * const data = [
  {
    "subject": "Math",
    "A": 120,
    "B": 110,
    "fullMark": 150
  },
  {
    "subject": "Chinese",
    "A": 98,
    "B": 130,
    "fullMark": 150
  },
   */
  useEffect(() => {
    console.log("en el userddafasfsdfsdf");
    if (
      typeof playersAttributes !== "undefined" &&
      playersAttributes.length !== 0
    ) {
      const attributes = Object.keys(playersAttributes[0]).filter(
        (key) => key !== "player_id"
      );

      const radarData = attributes.map((attr) => {
        const dataPoint = {
          attribute: attr.charAt(0).toUpperCase() + attr.slice(1),
          fullMark: 100,
        };

        playersAttributes.forEach((player) => {
          dataPoint[`player_${player.player_id}`] = player[attr];
        });

        return dataPoint;
      });
      setParsed(radarData);
    }
  }, []);

  console.log(parsedData);

  return (
    <RadarChart outerRadius={90} width={730} height={250} data={parsedData}>
      <PolarGrid />
      <PolarAngleAxis dataKey="attribute" />
      <PolarRadiusAxis angle={30} domain={[0, 100]} />
      {parsedData.map((data, index) => {
        console.log("khee", data);
        return (
          <Radar
            dataKey={`${Object.keys(data)[index]}`}
            stroke="#38bdf8"
            fill="#7dd3fc"
            fillOpacity={0.6}
          />
        );
      })}
    </RadarChart>
  );
};

export default RadarPlayersAtt;
