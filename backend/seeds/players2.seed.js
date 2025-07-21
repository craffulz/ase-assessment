import fs from "fs/promises";

const normalizeName = (name) => {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

function processPlayers(doc1, doc2) {
  const doc2PlayersMap = new Map();
  doc2.players.forEach((player) => {
    const normalized = normalizeName(player.name);
    doc2PlayersMap.set(normalized, player);
  });

  const updates = [];
  const inserts = [];

  Object.keys(doc1.playerDataSchema).forEach((key) => {
    if (key.startsWith("PL")) {
      const player1 = doc1.playerDataSchema[key];
      const normalized = normalizeName(player1.basicInfo.name);
      const doc2Player = doc2PlayersMap.get(normalized);

      if (doc2Player) {
        updates.push({
          id: doc2Player.id,
          market_value: player1.marketData.currentMarketValue,
        });
      } else {
        const newPlayer = {
          name: player1.basicInfo.name,
          position: player1.clubInfo.position,
          age: player1.basicInfo.age,
          team: player1.clubInfo.currentTeam,
          nationality: player1.basicInfo.nationality,
          height: player1.basicInfo.height,
          weight: player1.basicInfo.weight,
          goals: player1.seasonStats.basicStats.goals,
          assists: player1.seasonStats.basicStats.assists,
          appearances: player1.seasonStats.basicStats.appearances,
          contract_salary: player1.contractInfo.salary.annualSalary,
          contract_end: player1.contractInfo.contractEnd,
          market_value: player1.marketData.currentMarketValue,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        inserts.push(newPlayer);
      }
    }
  });

  return { updates, inserts };
}

try {
  const doc1 = await fs.readFile(
    "../../data/player_statistics_detailed.json",
    "utf8"
  );

  const doc2 = await fs.readFile("../../data/players_Data_production.json", "utf8");

  console.log(doc1, doc2)

  const players1 = JSON.parse(doc1)
  const players2 = JSON.parse(doc2)

  console.log(players1, players2)

  const seedData = processPlayers(players1, players2);

  fs.writeFile("players2.sql", JSON.stringify(seedData, null, 2));

  console.log(`Seed generated`);
} catch (error) {
  console.error("Error: ", error);
}
