import React from "react";

const TryComp = ({ data }) => {
  const renderHeaders = () => {
    return "fayen";
  };

  const { loading, players } = data;
  return (
    <table className="table">
      <thead>
        <tr>
          {renderHeaders("name", "Name")}
          {renderHeaders("position", "Position")}
          {renderHeaders("team", "Team")}
          {renderHeaders("appearances", "Appearances")}
          {renderHeaders("goals", "Goals")}
          {renderHeaders("assists", "Assists")}
          {renderHeaders("height", "Height (cm)")}
          {renderHeaders("weight", "Weight (kg)")}
          {renderHeaders("contract_end", "Contract End")}
          {renderHeaders("contract_salary", "Salary (€)")}
          {renderHeaders("market_value", "Market Value (€)")}
          {renderHeaders("nationality", "Nationality")}
          {renderHeaders("age", "Age")}
        </tr>
      </thead>
      {loading ? (
        <h2>Loading Players...</h2>
      ) : (
        <tbody>
          {players.map((player, index) => {
            return (
              <tr key={index}>
                <td>{player.name}</td>
                <td>{player.position}</td>
                <td>{player.team}</td>
                <td>{player.appearances}</td>
                <td>{player.goals}</td>
                <td>{player.assists}</td>
                <td>{player.height}</td>
                <td>{player.weight}</td>
                <td>{player.contract_end}</td>
                <td>{player.contract_salary}</td>
                <td>{player.market_value}</td>
                <td>{player.nationality}</td>
                <td>{player.age}</td>
              </tr>
            );
          })}
        </tbody>
      )}
    </table>
  );
};

export default TryComp;
