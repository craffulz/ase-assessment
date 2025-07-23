import data from "../../../../data/player_statistics_detailed.json";
import { LineChart, Line } from "recharts";
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

  return <div>LineMarketXHistory</div>;
};

export default LineMarketXHistory;
