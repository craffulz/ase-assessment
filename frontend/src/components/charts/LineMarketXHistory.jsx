import data from "../../../../data/player_statistics_detailed.json";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from "recharts";
const LineMarketXHistory = () => {
  const filteredData = Object.fromEntries(
    Object.entries(data.playerDataSchema).filter(([key]) =>
      key.startsWith("PL")
    )
  );
  const marketValues = [];
  Object.values(filteredData).forEach(({ basicInfo, marketData }) => {
    marketValues.push({
      name: basicInfo.name,
      ...marketData.valueHistory,
    });
  });

  console.log("MARKETVALUERS ", marketValues);

  const showData = marketValues.slice(0, 3);

  const colors = [
    "#0ea5e9",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#f97316",
    "#06b6d4",
    "#84cc16",
  ];

  console.log(showData);

  return (
    <LineChart
      width={300}
      height={300}
      data={showData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      {showData.map((player, index) => {
        return (
          <Line
            key={index}
            type="monotone"
            dataKey={player.name}
            stroke={colors[index]}
            strokeWidth={3}
          />
        );
      })}
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="" />
      <YAxis />
      <Tooltip />
      <Legend />
    </LineChart>
  );
};

export default LineMarketXHistory;
