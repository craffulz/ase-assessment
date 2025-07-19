import fs from 'fs/promises';
import bcrypt from 'bcryptjs';

const generateScoutingSeeds = async () => {
  try {

    const playersData = await fs.readFile('../../data/players_Data_production.json', 'utf8');
    const players = JSON.parse(playersData).players;
    const existingPlayerIds = players.map(p => p.id);
    
 
    const reportsData = await fs.readFile('../../data/scout_report.json', 'utf8');
    const { scoutingReports } = JSON.parse(reportsData);
    
    let sqlContent = `BEGIN;\n\n`;
    

    sqlContent += `-- Crear usuarios para scouts\n`;
    const scoutUsers = {};
    
    for (const report of scoutingReports) {
      const scoutName = report.scoutName;
      if (!scoutUsers[scoutName]) {
        const email = `${scoutName.toLowerCase().replace(/\s+/g, '.')}@example.com`;
        const password = 'ScoutPassword123!';
        const hashedPassword = await bcrypt.hash(password, 10);
        
        scoutUsers[scoutName] = {
          email,
          hashedPassword
        };
        
        sqlContent += `-- Creando usuario para: ${scoutName}\n`;
        sqlContent += `INSERT INTO users (email, password_hash, name, created_at)\n`;
        sqlContent += `VALUES (\n`;
        sqlContent += `  '${email}',\n`;
        sqlContent += `  '${hashedPassword}',\n`;
        sqlContent += `  '${scoutName.replace(/'/g, "''")}',\n`;
        sqlContent += `  CURRENT_TIMESTAMP\n`;
        sqlContent += `) ON CONFLICT (email) DO NOTHING;\n\n`;
      }
    }
    

    sqlContent += `-- Crear perfiles de scouts\n`;
    for (const scoutName in scoutUsers) {
      sqlContent += `-- Creando perfil scout para: ${scoutName}\n`;
      sqlContent += `INSERT INTO scouts (user_id, full_name, created_at)\n`;
      sqlContent += `SELECT id, '${scoutName.replace(/'/g, "''")}', CURRENT_TIMESTAMP\n`;
      sqlContent += `FROM users WHERE email = '${scoutUsers[scoutName].email}'\n`;
      sqlContent += `ON CONFLICT (user_id) DO NOTHING;\n\n`;
    }
    

    sqlContent += `-- Crear scouting reports\n`;
    sqlContent += `INSERT INTO scout_reports (\n`;
    sqlContent += `  player_id, scout_id, match_date, overall_rating,\n`;
    sqlContent += `  strengths, weaknesses, recommendation, created_at\n`;
    sqlContent += `) VALUES\n`;
    
    const reportInserts = [];
    let validReports = 0;
    
    for (const report of scoutingReports) {
  
      if (!existingPlayerIds.includes(report.playerId)) {
        console.warn(`⚠️ Saltando reporte para player_id ${report.playerId} (no existe)`);
        continue;
      }
      
      const scoutName = report.scoutName.replace(/'/g, "''");
      

      const recommendation = report.recommendation.substring(0, 50).replace(/'/g, "''");
      
      reportInserts.push(`(
        ${report.playerId},
        (SELECT user_id FROM scouts WHERE full_name = '${scoutName}'),
        '${report.date}',
        ${report.overallRating},
        '${report.strengths.map(s => s.replace(/'/g, "''")).join('; ')}',
        '${report.weaknesses.map(w => w.replace(/'/g, "''")).join('; ')}',
        '${recommendation}',
        CURRENT_TIMESTAMP
      )`);
      
      validReports++;
    }
    
    if (validReports === 0) {
      sqlContent += `-- No hay reportes válidos para insertar\n`;
      console.warn('⚠️ No se encontraron reportes válidos para insertar');
    } else {
      sqlContent += reportInserts.join(',\n');
      sqlContent += ';\n\n';
    }
    
    sqlContent += `COMMIT;\n`;
    
    await fs.writeFile('scouting_reports_seeds.sql', sqlContent);
    console.log(` ${validReports} scouting reports generados correctamente`);
    
  } catch (error) {
    console.error('Error:', error);
  }
};


generateScoutingSeeds();