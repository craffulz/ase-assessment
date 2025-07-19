import fs from 'fs/promises';


const formatValue = (value, columnType) => {
  if (value === null || value === undefined) return 'NULL';
  

  if (typeof value === 'string' && value.startsWith('CURRENT_TIMESTAMP')) return value;

  switch (columnType) {
    case 'integer':
    case 'smallint':
      return value.toString();
    case 'date':
      return `'${value}'`;
    case 'timestamp without time zone':
      return `'${value}'`;  
    default: 
      return `'${value.toString().replace(/'/g, "''")}'`;
  }
};

const generatePlayerSeeds = async () => {
  try {
    const data = await fs.readFile('../../data/players_Data_production.json', 'utf8');
    const { players } = JSON.parse(data);
    
    let sqlContent = `-- Seeds para tabla players\n\n`;
    sqlContent += `INSERT INTO players (\n`;
    sqlContent += `  id, name, position, age, team, nationality, height, weight,\n`;
    sqlContent += `  goals, assists, appearances, contract_salary, contract_end, market_value,\n`;
    sqlContent += `  created_at, updated_at\n`;
    sqlContent += `) VALUES\n`;

    const inserts = players.map(player => {
      const stats = player.stats || {};
      const contract = player.contract || {};
      

      const values = {
        id: player.id,
        name: player.name,
        position: player.position,
        age: player.age,
        team: player.team,
        nationality: player.nationality,
        height: player.height,
        weight: player.weight,
        goals: stats.goals || 0,
        assists: stats.assists || 0,
        appearances: stats.appearances || 0,
        contract_salary: contract.salary ? parseInt(contract.salary) : null, 
        contract_end: contract.contractEnd || null,
        market_value: null,
        created_at: 'CURRENT_TIMESTAMP',
        updated_at: 'CURRENT_TIMESTAMP'
      };


      const formattedValues = [
        formatValue(values.id, 'integer'),
        formatValue(values.name, 'character varying(100)'),
        formatValue(values.position, 'character varying(50)'),
        formatValue(values.age, 'smallint'),
        formatValue(values.team, 'character varying(100)'),
        formatValue(values.nationality, 'character varying(50)'),
        formatValue(values.height, 'integer'),
        formatValue(values.weight, 'integer'),
        formatValue(values.goals, 'integer'),
        formatValue(values.assists, 'integer'),
        formatValue(values.appearances, 'integer'),
        formatValue(values.contract_salary, 'integer'), 
        formatValue(values.contract_end, 'date'),
        formatValue(values.market_value, 'integer'),    
        formatValue(values.created_at, 'timestamp without time zone'),
        formatValue(values.updated_at, 'timestamp without time zone')
      ];

      return `  (${formattedValues.join(', ')})`;
    });

    sqlContent += inserts.join(',\n');
    sqlContent += ';\n\n';

    
    const maxId = Math.max(...players.map(p => p.id));
    const nextId = maxId + 1;
    
    sqlContent += `-- Ajustar secuencia para futuros inserts\n`;
    sqlContent += `SELECT setval('players_id_seq', ${nextId});\n`;

    await fs.writeFile('players_seeds.sql', sqlContent);
    console.log('Seeds generados correctamente en players_seeds.sql');

  } catch (error) {
    console.error( 'Error:', error);
  }
};


generatePlayerSeeds();