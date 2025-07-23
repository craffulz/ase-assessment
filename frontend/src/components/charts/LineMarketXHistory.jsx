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
  [...Object.values(filteredData)].forEach(({ basicInfo, marketData }) => {
    marketValues.push({
      name: basicInfo.name,
      ...marketData.valueHistory,
    });
  });

  console.log(marketValues);

  return (
    <LineChart
      width={300}
      height={300}
      data={marketValues}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="pv" stroke="#8884d8" />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>
  );
};

export default LineMarketXHistory;
