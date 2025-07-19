import fs from "fs/promises";

const formatValue = (value) => {
  if (value === null || value === undefined) return "NULL";
  return value.toString();
};

const generateAttributesSeeds = async () => {
  try {
    const data = await fs.readFile("../../data/players_Data_production.json", "utf8");
    const { players } = JSON.parse(data);

    let sqlContent = `-- Seeds para tabla player_attributes\n\n`;
    sqlContent += `INSERT INTO player_attributes (\n`;
    sqlContent += ` player_id, pace, shooting, passing, defending, dribbling, physical\n`;
    sqlContent += `) VALUES\n`;

    const inserts = players.map((player) => {
      const attributes = player.attributes || {};

      const values = {
        player_id: player.id,
        pace: attributes.pace || null,
        shooting: attributes.shooting || null,
        passing: attributes.passing || null,
        defending: attributes.defending || null,
        dribbling: attributes.dribbling || null,
        physical: attributes.physical || null,
      };

      const formattedValues = [
        formatValue(values.player_id),
        formatValue(values.pace),
        formatValue(values.shooting),
        formatValue(values.passing),
        formatValue(values.defending),
        formatValue(values.dribbling),
        formatValue(values.physical),
      ];

      return `  (${formattedValues.join(", ")})`;
    });

    sqlContent += inserts.join(",\n");
    sqlContent += ";\n";

    await fs.writeFile("player_attributes_seeds.sql", sqlContent);
    console.log("Seeds generated");
  } catch (error) {
    console.error("Error:", error);
  }
};

generateAttributesSeeds();
