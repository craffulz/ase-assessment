import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlayers } from "../store/players.slice.js";

const MarketInsights = () => {
  const { players, loading, error } = useSelector((state) => state.players);

  const { accessToken } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const today = new Date();
  const in6months = new Date(today);
  in6months.setMonth(today.getMonth() + 6);

  const formatedToday = today.toISOString().split("T")[0];
  const formatedIn6 = in6months.toISOString().split("T")[0];
  console.log("date", formatedIn6);

  //cuando hago el componente de filtro toda la logica de busqueda de players estara ahi
  useEffect(() => {
    // const fetchTopValuables = async () => {
    //   await dispatch(
    //     fetchPlayers({
    //       accessToken: accessToken,
    //       limit: null,
    //       filters: { excludeNullMarketValue: true },
    //       sort: { field: "market_value", direction: "desc" },
    //     })
    //   );

    //   return players.slice(0, 3);
    // };

    const fetchCloseEndContract = async () => {
      await dispatch(
        fetchPlayers({
          accessToken: accessToken,
          limit: null,
          filters: {
            minContractEnd: formatedToday,
            maxContractEnd: formatedIn6,
          },
        })
      );

      return players;
    };

    //const topValuables = fetchTopValuables();
    const closeEndContract = fetchCloseEndContract();

    //console.log(topValuables);
    console.log(closeEndContract);
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (error) console.log("Error: ", error.message);

  return <div>MarketInsights</div>;
};

export default MarketInsights;
