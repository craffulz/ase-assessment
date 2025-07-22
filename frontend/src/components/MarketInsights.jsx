import React from "react";
import { useSelector } from "react-redux";

const MarketInsights = () => {
  const { players, loading, error } = useSelector((state) => state.players);

  console.log(players);

  //Get most valuable players => where market_value not null and sort (a, b)(b-a)
  const topValuables = [...players]
    .filter(({ market_value }) => market_value !== null)
    .sort((a, b) => b.market_value - a.market_value)
    .slice(0, 3);
  //Get players with close contract end, calculate today date and in 6 months?
  const today = new Date();
  const in6months = new Date();
  in6months.setMonth(today.getMonth() + 6);

  console.log(in6months.toISOString().split("T")[0]);

  const closeEndContract = [...players].filter(({ contract_end }) => {
    const contractEnd = new Date(contract_end);
    return contractEnd <= in6months && contractEnd >= today;
  });

  console.log(topValuables, closeEndContract);


  if (loading) return <h2>Loading...</h2>;
  if (error) console.log("Error: ", error.message);

  return <div>MarketInsights</div>;
};

export default MarketInsights;
