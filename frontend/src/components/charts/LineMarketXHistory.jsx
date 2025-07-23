import data from "../../../../data/player_statistics_detailed.json";

const LineMarketXHistory = () => {
  //get name, marketvalue, date and value
  // Asumiendo que tienes un objeto como este:

  // Solución CORRECTA:
  const filteredData = Object.fromEntries(
    Object.entries(data.playerDataSchema).filter(([key]) =>
      key.startsWith("PL")
    )
  );

  console.log("waa3", filteredData);
  // Debería devolver: { PL1: {...}, PL2: {...}, PL3: {...} }

  const marketValues = [];
  [...Object.values(filteredData)].forEach(({ basicInfo, marketData }) => {
    console.log(basicInfo, marketData);
    marketValues.push({
      name: basicInfo.name,
      ...marketData.valueHistory,
    });
  });

  console.log(marketValues);

  return <div>LineMarketXHistory</div>;
};

export default LineMarketXHistory;
