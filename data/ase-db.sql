
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    position VARCHAR(50) NOT NULL,
    age SMALLINT CHECK (age BETWEEN 16 AND 50),
    team VARCHAR(100) NOT NULL,
    nationality VARCHAR(50) NOT NULL,
    height NUMERIC(4,2) NOT NULL, 
    weight SMALLINT NOT NULL,        
    assists INT DEFAULT 0,
    appearances INT DEFAULT 0,
    contract_salary NUMERIC(10,2) CHECK (contract_salary >= 0),
    contract_end DATE,
    market_value NUMERIC(10,2) CHECK (market_value >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE player_attributes (
    player_id INT PRIMARY KEY REFERENCES players(id) ON DELETE CASCADE,
    pace SMALLINT CHECK (pace BETWEEN 0 AND 100),
    shooting SMALLINT CHECK (shooting BETWEEN 0 AND 100),
    passing SMALLINT CHECK (passing BETWEEN 0 AND 100),
    defending SMALLINT CHECK (defending BETWEEN 0 AND 100),
    dribbling SMALLINT CHECK (dribbling BETWEEN 0 AND 100),
    physicality SMALLINT CHECK (physicality BETWEEN 0 AND 100)
);


CREATE TABLE scout_reports (
    id SERIAL PRIMARY KEY,
    player_id INT NOT NULL REFERENCES players(id) ON DELETE CASCADE,
    scout_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    match_date DATE NOT NULL,
    overall_rating SMALLINT NOT NULL CHECK (overall_rating BETWEEN 0 AND 100), 
    strengths TEXT,
    weaknesses TEXT,
    recommendation VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_players_team ON players(team);
CREATE INDEX idx_players_position ON players(position);
CREATE INDEX idx_reports_player ON scout_reports(player_id);
CREATE INDEX idx_reports_scout ON scout_reports(scout_id);
CREATE INDEX idx_reports_date ON scout_reports(match_date);

CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_players_updated_at
BEFORE UPDATE ON players
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();